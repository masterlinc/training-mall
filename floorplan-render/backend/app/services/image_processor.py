import os
import uuid
from pathlib import Path
from typing import Optional, Tuple
from PIL import Image
from app.config import get_settings

def save_upload_file(file_content: bytes, extension: str) -> Tuple[str, Path]:
    """保存上传文件并返回文件ID和路径"""
    settings = get_settings()
    file_id = str(uuid.uuid4())
    filename = f"{file_id}.{extension}"
    filepath = settings.upload_dir / filename
    
    with open(filepath, 'wb') as f:
        f.write(file_content)
    
    return file_id, filepath

def validate_file_extension(filename: str) -> Optional[str]:
    """验证文件扩展名并返回标准化扩展名"""
    settings = get_settings()
    
    if '.' not in filename:
        return None
    
    ext = filename.rsplit('.', 1)[1].lower()
    
    if ext == 'dwg':
        return 'dwg'
    
    if ext not in settings.allowed_extensions:
        return None
    
    return ext

def validate_file_size(file_size: int) -> bool:
    """验证文件大小"""
    settings = get_settings()
    return file_size <= settings.max_file_size

def compress_image(input_path: Path, max_dimension: int = 1024) -> Tuple[int, int]:
    """压缩图片到指定最大尺寸"""
    with Image.open(input_path) as img:
        original_width, original_height = img.size
        
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        if original_width > max_dimension or original_height > max_dimension:
            if original_width > original_height:
                new_width = max_dimension
                new_height = int(original_height * (max_dimension / original_width))
            else:
                new_height = max_dimension
                new_width = int(original_width * (max_dimension / original_height))
            
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        output_path = input_path.with_suffix('.png')
        img.save(output_path, 'PNG', optimize=True)
        
        if output_path != input_path:
            input_path.unlink()
        
        return new_width if original_width > original_height else original_width, \
               new_height if original_width > original_height else original_height

def get_image_dimensions(filepath: Path) -> Tuple[int, int]:
    """获取图片尺寸"""
    with Image.open(filepath) as img:
        return img.size

def format_file_size(size_bytes: int) -> str:
    """格式化文件大小显示"""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} TB"
