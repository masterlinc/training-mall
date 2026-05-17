#!/bin/bash

# 户型图 AI 生成装修效果图 - 一键启动脚本

set -e

# 定义颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  户型图 AI 生成装修效果图 启动脚本${NC}"
echo -e "${GREEN}========================================${NC}"

# 检查端口占用
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# 检查并停止占用端口的进程
stop_port() {
    local port=$1
    if check_port $port; then
        echo -e "${YELLOW}端口 $port 已被占用，正在尝试关闭...${NC}"
        lsof -Pi :$port -sTCP:LISTEN -t | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
}

# 检查依赖
check_dependencies() {
    echo -e "\n${YELLOW}检查系统依赖...${NC}"
    
    # 检查 Python
    if ! command -v python3 &> /dev/null; then
        echo -e "${RED}错误: 未找到 Python3，请先安装 Python 3.10+${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Python3 已安装${NC}"
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}错误: 未找到 Node.js，请先安装 Node.js 18+${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Node.js 已安装${NC}"
    
    # 检查 poppler (PDF 处理)
    if ! command -v pdftoppm &> /dev/null; then
        echo -e "${YELLOW}警告: 未找到 poppler (PDF 处理工具)${NC}"
        echo -e "${YELLOW}  Ubuntu/Debian: sudo apt-get install poppler-utils${NC}"
        echo -e "${YELLOW}  macOS: brew install poppler${NC}"
    else
        echo -e "${GREEN}✓ poppler 已安装${NC}"
    fi
}

# 安装后端依赖
install_backend() {
    echo -e "\n${YELLOW}安装后端依赖...${NC}"
    cd "$PROJECT_DIR/backend"
    
    # 创建虚拟环境（可选）
    # python3 -m venv venv
    # source venv/bin/activate
    
    pip install -r requirements.txt --quiet
    echo -e "${GREEN}✓ 后端依赖安装完成${NC}"
}

# 安装前端依赖
install_frontend() {
    echo -e "\n${YELLOW}安装前端依赖...${NC}"
    cd "$PROJECT_DIR/frontend"
    
    if [ ! -d "node_modules" ]; then
        npm install
    fi
    echo -e "${GREEN}✓ 前端依赖安装完成${NC}"
}

# 创建必要的目录
create_dirs() {
    echo -e "\n${YELLOW}创建必要目录...${NC}"
    mkdir -p "$PROJECT_DIR/uploads"
    mkdir -p "$PROJECT_DIR/outputs"
    mkdir -p "$PROJECT_DIR/backend/uploads"
    mkdir -p "$PROJECT_DIR/backend/outputs"
    echo -e "${GREEN}✓ 目录创建完成${NC}"
}

# 复制环境变量文件
setup_env() {
    echo -e "\n${YELLOW}检查环境变量配置...${NC}"
    
    if [ ! -f "$PROJECT_DIR/backend/.env" ]; then
        if [ -f "$PROJECT_DIR/backend/.env.example" ]; then
            cp "$PROJECT_DIR/backend/.env.example" "$PROJECT_DIR/backend/.env"
            echo -e "${YELLOW}✓ 已创建 .env 文件，请编辑并填入您的 API Key${NC}"
        fi
    fi
    
    if [ ! -f "$PROJECT_DIR/frontend/.env" ]; then
        if [ -f "$PROJECT_DIR/frontend/.env.example" ]; then
            cp "$PROJECT_DIR/frontend/.env.example" "$PROJECT_DIR/frontend/.env"
        fi
    fi
}

# 启动后端
start_backend() {
    echo -e "\n${YELLOW}启动后端服务 (端口 8000)...${NC}"
    cd "$PROJECT_DIR/backend"
    
    # 后台启动
    nohup python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload > "$PROJECT_DIR/backend.log" 2>&1 &
    BACKEND_PID=$!
    
    # 等待启动
    sleep 3
    
    if check_port 8000; then
        echo -e "${GREEN}✓ 后端服务已启动 (PID: $BACKEND_PID)${NC}"
        echo -e "${GREEN}  API 文档: http://localhost:8000/docs${NC}"
    else
        echo -e "${RED}✗ 后端服务启动失败，请查看日志: $PROJECT_DIR/backend.log${NC}"
        exit 1
    fi
}

# 启动前端
start_frontend() {
    echo -e "\n${YELLOW}启动前端服务 (端口 5173)...${NC}"
    cd "$PROJECT_DIR/frontend"
    
    # 后台启动
    nohup npm run dev > "$PROJECT_DIR/frontend.log" 2>&1 &
    FRONTEND_PID=$!
    
    # 等待启动
    sleep 5
    
    if check_port 5173; then
        echo -e "${GREEN}✓ 前端服务已启动 (PID: $FRONTEND_PID)${NC}"
        echo -e "${GREEN}  访问地址: http://localhost:5173${NC}"
    else
        echo -e "${RED}✗ 前端服务启动失败，请查看日志: $PROJECT_DIR/frontend.log${NC}"
        exit 1
    fi
}

# 停止服务
stop_services() {
    echo -e "\n${YELLOW}停止所有服务...${NC}"
    
    # 停止后端
    pkill -f "uvicorn app.main:app" 2>/dev/null || true
    pkill -f "python.*uvicorn" 2>/dev/null || true
    
    # 停止前端
    pkill -f "vite" 2>/dev/null || true
    pkill -f "node.*vite" 2>/dev/null || true
    
    stop_port 8000
    stop_port 5173
    
    echo -e "${GREEN}✓ 所有服务已停止${NC}"
}

# 显示帮助
show_help() {
    echo "用法: $0 [命令]"
    echo ""
    echo "命令:"
    echo "  start     启动所有服务（默认）"
    echo "  stop      停止所有服务"
    echo "  restart   重启所有服务"
    echo "  status    查看服务状态"
    echo "  help      显示帮助信息"
}

# 显示状态
show_status() {
    echo -e "\n${YELLOW}服务状态:${NC}"
    
    if check_port 8000; then
        echo -e "${GREEN}✓ 后端服务: 运行中 (端口 8000)${NC}"
    else
        echo -e "${RED}✗ 后端服务: 未运行${NC}"
    fi
    
    if check_port 5173; then
        echo -e "${GREEN}✓ 前端服务: 运行中 (端口 5173)${NC}"
    else
        echo -e "${RED}✗ 前端服务: 未运行${NC}"
    fi
}

# 主逻辑
case "${1:-start}" in
    start)
        check_dependencies
        install_backend
        install_frontend
        create_dirs
        setup_env
        stop_services
        start_backend
        start_frontend
        
        echo -e "\n${GREEN}========================================${NC}"
        echo -e "${GREEN}  所有服务已成功启动！${NC}"
        echo -e "${GREEN}========================================${NC}"
        echo -e "\n访问地址:"
        echo -e "  前端: ${YELLOW}http://localhost:5173${NC}"
        echo -e "  API:  ${YELLOW}http://localhost:8000/docs${NC}"
        echo -e "\n日志文件:"
        echo -e "  后端: $PROJECT_DIR/backend.log"
        echo -e "  前端: $PROJECT_DIR/frontend.log"
        echo -e "\n停止服务: $0 stop"
        ;;
    stop)
        stop_services
        ;;
    restart)
        stop_services
        $0 start
        ;;
    status)
        show_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}未知命令: $1${NC}"
        show_help
        exit 1
        ;;
esac
