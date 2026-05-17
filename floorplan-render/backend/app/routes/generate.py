from fastapi import APIRouter, HTTPException
from app.models import APIResponse, GenerateRequest, GenerateResponse, TaskStatus, HistoryItem
from app.services.ai_service import ai_service
from datetime import datetime

router = APIRouter(prefix="/api", tags=["生成"])

@router.post("/generate", response_model=APIResponse)
async def generate_render(request: GenerateRequest):
    """
    创建效果图生成任务
    
    参数:
    - file_id: 已上传文件的ID
    - style: 装修风格 (modern-minimalist/nordic/chinese-modern/light-luxury/industrial/japanese)
    - custom_prompt: 可选的自定义描述
    """
    try:
        task_id = ai_service.create_task(
            file_id=request.file_id,
            style=request.style,
            custom_prompt=request.custom_prompt or ""
        )
        
        return APIResponse.success({
            "task_id": task_id,
            "status": "pending"
        })
        
    except FileNotFoundError as e:
        return APIResponse.error(404, str(e))
    except Exception as e:
        return APIResponse.error(500, f"生成任务创建失败: {str(e)}")

@router.get("/tasks/{task_id}", response_model=APIResponse)
async def get_task_status(task_id: str):
    """
    查询生成任务状态
    
    返回:
    - status: pending/processing/completed/failed
    - progress: 完成百分比
    - output_url: 效果图URL（完成后）
    - error: 错误信息（失败时）
    """
    task = ai_service.get_task_status(task_id)
    
    if task is None:
        return APIResponse.error(404, "任务不存在")
    
    return APIResponse.success({
        "task_id": task["task_id"],
        "status": task["status"],
        "progress": task["progress"],
        "output_url": task["output_url"],
        "error": task["error"]
    })

@router.get("/history", response_model=APIResponse)
async def get_history():
    """
    获取生成历史记录
    """
    try:
        tasks = ai_service.get_all_tasks()
        
        history = [
            {
                "task_id": task.get("task_id", ""),
                "file_id": task.get("file_id", ""),
                "original_filename": task.get("file_id", "") + ".png",
                "style": task.get("style", ""),
                "status": task.get("status", ""),
                "output_url": task.get("output_url"),
                "created_at": task.get("created_at", datetime.now().isoformat())
            }
            for task in tasks[-20:]
        ]
        
        return APIResponse.success(history)
        
    except Exception as e:
        return APIResponse.error(500, f"获取历史记录失败: {str(e)}")

@router.delete("/tasks/{task_id}")
async def cancel_task(task_id: str):
    """取消生成任务"""
    return APIResponse.error(501, "任务取消功能暂未实现")
