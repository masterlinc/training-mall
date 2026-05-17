#!/bin/bash

echo "🚀 高校培训商城 - Vercel 部署脚本"
echo "========================================"

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目目录下运行此脚本"
    echo "   cd /Users/masterlinc/Documents/Traning\\ App"
    exit 1
fi

# 检查 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 正在安装 Vercel CLI..."
    npm install -g vercel
fi

echo ""
echo "✅ Vercel CLI 已就绪"
echo ""
echo "📋 部署步骤："
echo "----------------------------------------"
echo "1. 执行: vercel login"
echo "2. 在浏览器中登录你的邮箱"
echo "3. 回到终端按回车"
echo "4. 执行: vercel --prod"
echo "----------------------------------------"
echo ""
echo "或者直接复制以下命令执行："
echo ""
echo "   vercel login"
echo "   vercel --prod"
echo ""
echo "========================================"
