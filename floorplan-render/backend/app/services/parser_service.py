import os
import uuid
from pathlib import Path
from typing import Optional, Dict, Any, Tuple
from PIL import Image
from app.config import get_settings
from app.services.image_processor import (
    save_upload_file,
    validate_file_extension,
    validate_file_size,
    compress_image,
    get_image_dimensions
)
from app.services.pdf_parser import parse_pdf, save_pdf_page_as_image, TimeoutException
from app.services.cad_parser import parse_dxf

class FileParserService:
    """文件解析服务"""
    
    def __init__(self):
        self.settings = get_settings()
    
    def parse_upload(self, file_content: bytes, filename: str) -> Dict[str, Any]:
        """
        解析上传文件并返回元数据
        
        Args:
            file_content: 文件二进制内容
            filename: 原始文件名
        
        Returns:
            包含文件ID、类型、预览URL等信息的字典
        
        Raises:
            ValueError: 文件类型不支持或解析失败
        """
        ext = validate_file_extension(filename)
        
        if ext is None:
            raise ValueError("不支持的文件类型，请上传 JPG、PNG、PDF 或 DXF 格式")
        
        if ext == 'dwg':
            raise ValueError("DWG 格式暂不支持，请转换为 DXF 格式后上传")
        
        if not validate_file_size(len(file_content)):
            raise ValueError(f"文件大小超过限制（最大 {self.settings.max_file_size // (1024*1024)}MB）")
        
        file_id, original_path = save_upload_file(file_content, ext)
        
        try:
            if ext in ('jpg', 'jpeg', 'png'):
                return self._parse_image(file_id, original_path, filename)
            elif ext == 'pdf':
                return self._parse_pdf(file_id, original_path, filename)
            elif ext == 'dxf':
                return self._parse_cad(file_id, original_path, filename)
            else:
                raise ValueError(f"未知文件类型: {ext}")
        except Exception as e:
            if original_path.exists():
                original_path.unlink()
            raise e
    
    def _parse_image(self, file_id: str, file_path: Path, original_filename: str) -> Dict[str, Any]:
        """解析图片文件"""
        try:
            width, height = compress_image(file_path, max_dimension=1024)
            
            preview_filename = f"{file_id}.png"
            
            return {
                "file_id": file_id,
                "type": "image",
                "preview_url": f"/api/files/{preview_filename}",
                "width": width,
                "height": height,
                "page_count": None,
                "original_filename": original_filename
            }
        except Exception as e:
            raise ValueError(f"图片处理失败: {str(e)}")
    
    def _parse_pdf(self, file_id: str, file_path: Path, original_filename: str) -> Dict[str, Any]:
        """解析 PDF 文件"""
        try:
            pdf_image, page_count = parse_pdf(file_path, page_number=1)
            
            preview_filename = f"{file_id}.png"
            preview_path = self.settings.upload_dir / preview_filename
            
            width, height = save_pdf_page_as_image(pdf_image, preview_path)
            
            if file_path.exists():
                file_path.unlink()
            
            return {
                "file_id": file_id,
                "type": "pdf",
                "preview_url": f"/api/files/{preview_filename}",
                "width": width,
                "height": height,
                "page_count": page_count,
                "original_filename": original_filename
            }
        except TimeoutException as e:
            raise ValueError(str(e))
        except Exception as e:
            raise ValueError(f"PDF 解析失败: {str(e)}")
    
    def _parse_cad(self, file_id: str, file_path: Path, original_filename: str) -> Dict[str, Any]:
        """解析 CAD (DXF) 文件"""
        try:
            result = parse_dxf(file_path)
            
            preview_filename = f"{file_id}.png"
            preview_path = self.settings.upload_dir / preview_filename
            
            result['image'].save(preview_path, 'PNG')
            
            if file_path.exists():
                file_path.unlink()
            
            return {
                "file_id": file_id,
                "type": "cad",
                "preview_url": f"/api/files/{preview_filename}",
                "width": result['image'].width,
                "height": result['image'].height,
                "page_count": None,
                "original_filename": original_filename,
                "geometry_data": result.get('entities', [])
            }
        except ImportError as e:
            raise ValueError(f"缺少依赖库: {str(e)}")
        except Exception as e:
            raise ValueError(f"CAD 文件解析失败: {str(e)}")

parser_service = FileParserService()
