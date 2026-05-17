import os
from pathlib import Path
from pydantic_settings import BaseSettings
from functools import lru_cache

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    # API 配置
    api_title: str = "户型图 AI 生成装修效果图 API"
    api_version: str = "1.0.0"
    
    # 文件存储路径
    upload_dir: Path = BASE_DIR / "uploads"
    output_dir: Path = BASE_DIR / "outputs"
    
    # 文件限制
    max_file_size: int = 50 * 1024 * 1024  # 50MB
    allowed_extensions: list = ["jpg", "jpeg", "png", "pdf", "dxf"]
    
    # AI API 配置
    tongyi_api_key: str = ""
    tongyi_api_url: str = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis"
    
    # 解析超时
    parse_timeout: int = 30  # 秒
    
    # CORS 配置
    cors_origins: list = ["http://localhost:5173", "http://localhost:3000", "*"]
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

@lru_cache()
def get_settings() -> Settings:
    return Settings()

def ensure_directories():
    """确保上传和输出目录存在"""
    settings = get_settings()
    settings.upload_dir.mkdir(parents=True, exist_ok=True)
    settings.output_dir.mkdir(parents=True, exist_ok=True)
