import os
import uuid
from datetime import datetime
from pathlib import Path

def generate_unique_id() -> str:
    """生成唯一ID"""
    return str(uuid.uuid4())

def get_timestamp() -> str:
    """获取当前时间戳"""
    return datetime.now().isoformat()

def ensure_dir(path: Path) -> None:
    """确保目录存在"""
    path.mkdir(parents=True, exist_ok=True)

def safe_filename(filename: str) -> str:
    """清理文件名"""
    keepcharacters = (' ', '.', '_', '-')
    return "".join(c for c in filename if c.isalnum() or c in keepcharacters).strip()

def file_exists(path: Path) -> bool:
    """检查文件是否存在"""
    return path.exists() and path.is_file()

def get_file_extension(filename: str) -> str:
    """获取文件扩展名"""
    return filename.rsplit('.', 1)[-1].lower() if '.' in filename else ''
