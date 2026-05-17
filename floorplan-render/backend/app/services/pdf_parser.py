import io
import signal
from pathlib import Path
from typing import Optional, Tuple
from PIL import Image
from pdf2image import convert_from_path
from app.config import get_settings

class TimeoutException(Exception):
    """解析超时异常"""
    pass

def timeout_handler(signum, frame):
    raise TimeoutException("PDF解析超时")

def parse_pdf(input_path: Path, page_number: int = 1) -> Tuple[Image.Image, int]:
    """
    解析 PDF 文件并转换为图片
    
    Args:
        input_path: PDF 文件路径
        page_number: 要提取的页码（从1开始）
    
    Returns:
        PIL Image 对象和总页数
    
    Raises:
        TimeoutException: 解析超时
        Exception: 其他解析错误
    """
    settings = get_settings()
    
    try:
        images = convert_from_path(
            str(input_path),
            dpi=150,
            first_page=page_number,
            last_page=page_number,
            fmt='png',
            timeout=settings.parse_timeout
        )
        
        if not images:
            raise ValueError("PDF 解析失败，未能提取任何页面")
        
        page_count = len(convert_from_path(
            str(input_path),
            dpi=72,
            fmt='count',
            timeout=settings.parse_timeout
        ))
        
        target_image = images[0]
        
        if target_image.mode in ('RGBA', 'P'):
            target_image = target_image.convert('RGB')
        
        return target_image, page_count
        
    except Exception as e:
        if "timeout" in str(e).lower():
            raise TimeoutException(f"PDF 解析超时（超过 {settings.parse_timeout} 秒）")
        raise e

def get_pdf_page_count(input_path: Path) -> int:
    """获取 PDF 总页数"""
    settings = get_settings()
    try:
        images = convert_from_path(
            str(input_path),
            dpi=72,
            fmt='count',
            timeout=settings.parse_timeout
        )
        return images
    except Exception:
        return 0

def save_pdf_page_as_image(pdf_image: Image.Image, output_path: Path) -> Tuple[int, int]:
    """将 PDF 页面图片保存为 PNG"""
    if pdf_image.mode in ('RGBA', 'P'):
        pdf_image = pdf_image.convert('RGB')
    
    width, height = pdf_image.size
    
    max_dimension = 1024
    if width > max_dimension or height > max_dimension:
        if width > height:
            new_width = max_dimension
            new_height = int(height * (max_dimension / width))
        else:
            new_height = max_dimension
            new_width = int(width * (max_dimension / height))
        
        pdf_image = pdf_image.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    pdf_image.save(output_path, 'PNG', optimize=True)
    
    return width, height
