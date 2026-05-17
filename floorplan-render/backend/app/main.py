import sys
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

from app.config import get_settings, ensure_directories
from app.routes import upload, generate, files

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    ensure_directories()
    yield

app = FastAPI(
    title=settings.api_title,
    version=settings.api_version,
    description="户型图 AI 生成装修效果图 API 服务",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = []
    for error in exc.errors():
        errors.append({
            "field": ".".join(str(loc) for loc in error["loc"]),
            "message": error["msg"]
        })
    return JSONResponse(
        status_code=400,
        content={
            "code": 400,
            "message": "请求参数验证失败",
            "data": {"errors": errors}
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "code": 500,
            "message": f"服务器内部错误: {str(exc)}",
            "data": None
        }
    )

app.include_router(upload.router)
app.include_router(generate.router)
app.include_router(files.router)

@app.get("/")
async def root():
    return {
        "service": "户型图 AI 生成装修效果图 API",
        "version": settings.api_version,
        "docs": "/docs",
        "status": "running"
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "version": settings.api_version
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
