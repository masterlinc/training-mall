from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime

class UploadResponse(BaseModel):
    """文件上传响应"""
    file_id: str = Field(..., description="文件唯一标识")
    type: Literal["image", "pdf", "cad"] = Field(..., description="文件类型")
    preview_url: str = Field(..., description="预览图片URL")
    width: int = Field(..., description="图片宽度")
    height: int = Field(..., description="图片高度")
    page_count: Optional[int] = Field(None, description="PDF页数")
    original_filename: str = Field(..., description="原始文件名")

class GenerateRequest(BaseModel):
    """生成效果图请求"""
    file_id: str = Field(..., description="已上传文件的ID")
    style: Literal[
        "modern-minimalist",
        "nordic",
        "chinese-modern",
        "light-luxury",
        "industrial",
        "japanese"
    ] = Field(..., description="装修风格")
    custom_prompt: Optional[str] = Field(None, description="自定义描述")

class TaskStatus(BaseModel):
    """任务状态响应"""
    task_id: str = Field(..., description="任务ID")
    status: Literal["pending", "processing", "completed", "failed"] = Field(..., description="任务状态")
    progress: int = Field(default=0, ge=0, le=100, description="完成进度百分比")
    output_url: Optional[str] = Field(None, description="效果图URL")
    error: Optional[str] = Field(None, description="错误信息")

class GenerateResponse(BaseModel):
    """生成任务创建响应"""
    task_id: str = Field(..., description="任务ID")
    status: str = Field(default="pending", description="初始状态")

class HistoryItem(BaseModel):
    """历史记录项"""
    task_id: str
    file_id: str
    original_filename: str
    style: str
    status: str
    output_url: Optional[str] = None
    created_at: datetime

class APIResponse(BaseModel):
    """统一API响应格式"""
    code: int = Field(200, description="状态码")
    message: str = Field("success", description="消息")
    data: Optional[dict | list | str] = Field(None, description="数据")
    
    @staticmethod
    def success(data: dict | list | str) -> "APIResponse":
        """成功响应"""
        return APIResponse(code=200, message="success", data=data)
    
    @staticmethod
    def error(code: int, message: str) -> "APIResponse":
        """错误响应"""
        return APIResponse(code=code, message=message, data=None)
