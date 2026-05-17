import os
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pathlib import Path
from app.config import get_settings

router = APIRouter(prefix="/api", tags=["文件"])

@router.get("/files/{filename}")
async def get_file(filename: str):
    """
    获取上传或生成的文件
    
    文件存储在:
    - uploads/ 目录: 原始上传文件
    - outputs/ 目录: AI 生成的效果图
    """
    settings = get_settings()
    
    upload_path = settings.upload_dir / filename
    output_path = settings.output_dir / filename
    
    if upload_path.exists() and upload_path.is_file():
        return FileResponse(
            path=upload_path,
            media_type='image/png',
            filename=filename
        )
    
    if output_path.exists() and output_path.is_file():
        return FileResponse(
            path=output_path,
            media_type='image/png',
            filename=filename
        )
    
    raise HTTPException(status_code=404, detail="文件不存在")

@router.get("/files/preview/{filename}")
async def get_preview(filename: str):
    """获取预览图片"""
    settings = get_settings()
    file_path = settings.upload_dir / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="预览文件不存在")
    
    return FileResponse(
        path=file_path,
        media_type='image/png',
        filename=filename
    )

@router.get("/health")
async def health_check():
    """健康检查"""
    return {"status": "ok", "service": "file-server"}
