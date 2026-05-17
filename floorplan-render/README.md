# 户型图 AI 生成装修效果图

基于 AI 的装修效果图生成工具，支持上传户型图（PDF、CAD、图片格式），自动解析并生成多种装修风格的效果图。

## 功能特性

- 📐 **多格式支持**: 支持 JPG、PNG、PDF、DXF 格式的户型图上传
- 🎨 **六种装修风格**: 现代简约、北欧、新中式、轻奢、工业风、日式
- 🤖 **AI 智能生成**: 基于通义万相 API 生成高质量效果图
- 🎲 **3D 预览**: Three.js 实现的 3D 房间模型预览
- 📥 **一键下载**: 效果图原图下载和 3D 场景截图

## 项目结构

```
floorplan-render/
├── backend/               # FastAPI 后端服务
│   ├── app/
│   │   ├── main.py       # FastAPI 入口
│   │   ├── config.py      # 配置管理
│   │   ├── models.py      # Pydantic 模型
│   │   ├── routes/        # API 路由
│   │   │   ├── upload.py   # 文件上传
│   │   │   ├── generate.py # AI 生成
│   │   │   └── files.py    # 文件访问
│   │   ├── services/      # 业务服务
│   │   │   ├── parser_service.py  # 文件解析
│   │   │   ├── pdf_parser.py       # PDF 处理
│   │   │   ├── cad_parser.py       # CAD 解析
│   │   │   ├── image_processor.py  # 图片处理
│   │   │   └── ai_service.py       # AI 服务
│   │   └── utils/
│   ├── uploads/           # 上传文件
│   ├── outputs/           # 生成文件
│   └── requirements.txt
├── frontend/              # React 前端
│   ├── src/
│   │   ├── api/          # API 客户端
│   │   ├── components/   # 组件
│   │   ├── pages/        # 页面
│   │   ├── styles/       # 样式
│   │   └── types/        # TypeScript 类型
│   ├── package.json
│   └── vite.config.ts
├── uploads/              # 共享上传目录
├── outputs/              # 共享输出目录
├── README.md
└── start.sh             # 启动脚本
```

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd floorplan-render
```

### 2. 安装系统依赖

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install -y poppler-utils
```

**macOS:**
```bash
brew install poppler
```

**Windows:**
- 下载 [poppler for Windows](https://github.com/oschwartz10612/poppler-windows/releases)
- 将 `Library/bin` 添加到系统 PATH

### 3. 配置 API Key

编辑 `backend/.env` 文件，填入您的通义万相 API Key：

```bash
cp backend/.env.example backend/.env
# 编辑 backend/.env，填入 TONGYI_API_KEY
```

> 获取 API Key: [阿里云百炼平台](https://bailian.console.aliyun.com/)

### 4. 一键启动

```bash
chmod +x start.sh
./start.sh
```

或手动启动：

**后端:**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**前端:**
```bash
cd frontend
npm install
npm run dev
```

### 5. 访问应用

- 前端: http://localhost:5173
- API 文档: http://localhost:8000/docs

## API 文档

### 上传文件

```http
POST /api/upload
Content-Type: multipart/form-data

file: <file>

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "file_id": "uuid",
    "type": "image|pdf|cad",
    "preview_url": "/api/files/xxx.png",
    "width": 1024,
    "height": 768,
    "original_filename": "floorplan.png"
  }
}
```

### 生成效果图

```http
POST /api/generate
Content-Type: application/json

{
  "file_id": "uuid",
  "style": "modern-minimalist",
  "custom_prompt": "optional custom description"
}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "task_id": "uuid",
    "status": "pending"
  }
}
```

### 查询任务状态

```http
GET /api/tasks/{task_id}

Response:
{
  "code": 200,
  "message": "success",
  "data": {
    "task_id": "uuid",
    "status": "processing|completed|failed",
    "progress": 50,
    "output_url": "/api/files/result.png"
  }
}
```

## 装修风格

| 风格 | 标识 | 描述 |
|------|------|------|
| 现代简约 | modern-minimalist | 简洁线条，中性色调，功能性家具 |
| 北欧风 | nordic | 浅色木料，白色主调，温馨纺织品 |
| 新中式 | chinese-modern | 传统元素，优雅木质，红色点缀 |
| 轻奢风 | light-luxury | 金色装饰，大理石纹理，高端材质 |
| 工业风 | industrial | 裸露砖墙，金属装置，复古灯泡 |
| 日式风 | japanese | 温暖木色，榻榻米元素，禅意空间 |

## 技术栈

### 后端
- FastAPI - Web 框架
- Pillow - 图片处理
- pdf2image - PDF 转换
- ezdxf - CAD 解析
- matplotlib - 图形渲染

### 前端
- React 18 + TypeScript
- Vite - 构建工具
- Ant Design 5 - UI 组件库
- Three.js + React Three Fiber - 3D 渲染
- Axios - HTTP 客户端

## 截图

[在此处添加应用截图]

## 常见问题

### DWG 格式不支持？
DWG 是二进制闭源格式，解析难度较大。请使用 AutoCAD 或在线工具将 DWG 转换为 DXF 格式后再上传。

### PDF 解析超时？
大型 PDF 文件解析时间较长，建议：
1. 简化 PDF 内容
2. 降低 PDF 文件大小
3. 尝试导出为图片后上传

### AI 生成失败？
1. 检查 API Key 是否配置正确
2. 确认 API Key 余额充足
3. 查看后端日志 `backend.log`

## License

MIT License
