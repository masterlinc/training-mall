from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models import APIResponse, UploadResponse
from app.services.parser_service import parser_service

router = APIRouter(prefix="/api", tags=["上传"])

@router.post("/upload", response_model=APIResponse)
async def upload_file(file: UploadFile = File(...)):
    """
    上传户型图文件
    
    支持格式: JPG, PNG, PDF, DXF
    - JPG/PNG: 直接压缩处理
    - PDF: 提取第一页转为图片
    - DXF: 解析CAD几何数据并渲染为图片
    - DWG: 不支持，返回错误提示
    """
    try:
        content = await file.read()
        
        if len(content) == 0:
            return APIResponse.error(400, "文件内容为空")
        
        result = parser_service.parse_upload(content, file.filename)
        
        return APIResponse.success(result)
        
    except ValueError as e:
        return APIResponse.error(400, str(e))
    except Exception as e:
        return APIResponse.error(500, f"文件上传失败: {str(e)}")

@router.get("/upload/health")
async def upload_health():
    """检查上传服务状态"""
    return APIResponse.success({"status": "ok"})
