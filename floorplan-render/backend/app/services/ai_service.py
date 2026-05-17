import os
import uuid
import asyncio
import httpx
from pathlib import Path
from typing import Dict, Any, Optional
from PIL import Image
import base64
import io
from app.config import get_settings

STYLE_PROMPTS = {
    "modern-minimalist": "Clean lines, neutral colors, functional furniture, contemporary design, minimalist aesthetic",
    "nordic": "Light woods, white tones, cozy textiles, Scandinavian aesthetic, bright airy space",
    "chinese-modern": "Traditional Chinese elements, elegant wood furniture, muted colors with subtle red accents, cultural harmony",
    "light-luxury": "Gold accents, marble textures, sophisticated lighting, luxurious materials, elegant atmosphere",
    "industrial": "Exposed brick walls, metal fixtures, raw concrete, vintage Edison bulbs, loft style",
    "japanese": "Warm wood tones, tatami elements, minimalist Zen atmosphere, shoji screens, Japanese aesthetics"
}

TASKS: Dict[str, Dict[str, Any]] = {}

def build_prompt(style: str, custom_prompt: str = "") -> str:
    """构建 AI 生成提示词"""
    style_desc = STYLE_PROMPTS.get(style, "")
    custom_desc = custom_prompt if custom_prompt else ""
    base = "Professional interior design rendering based on architectural floor plan"
    extras = "spatial layout preserved, furniture placement, natural lighting, photorealistic, 4k, architectural visualization"
    
    parts = [base, style_desc, custom_desc, extras]
    return ", ".join(filter(None, parts))

class AIService:
    """AI 生成服务"""
    
    def __init__(self):
        self.settings = get_settings()
        self.api_key = self.settings.tongyi_api_key
        self.api_url = self.settings.tongyi_api_url
    
    def create_task(self, file_id: str, style: str, custom_prompt: str = "") -> str:
        """创建生成任务"""
        task_id = str(uuid.uuid4())
        
        TASKS[task_id] = {
            "task_id": task_id,
            "file_id": file_id,
            "style": style,
            "custom_prompt": custom_prompt,
            "status": "pending",
            "progress": 0,
            "output_url": None,
            "error": None,
            "created_at": None
        }
        
        asyncio.create_task(self.process_task(task_id, file_id, style, custom_prompt))
        
        return task_id
    
    async def process_task(self, task_id: str, file_id: str, style: str, custom_prompt: str):
        """异步处理生成任务"""
        try:
            TASKS[task_id]["status"] = "processing"
            TASKS[task_id]["progress"] = 10
            
            file_path = self.settings.upload_dir / f"{file_id}.png"
            
            if not file_path.exists():
                raise FileNotFoundError(f"文件不存在: {file_id}")
            
            TASKS[task_id]["progress"] = 20
            
            with Image.open(file_path) as img:
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                buffer = io.BytesIO()
                img.save(buffer, format='JPEG', quality=85)
                image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
            
            TASKS[task_id]["progress"] = 30
            
            prompt = build_prompt(style, custom_prompt)
            
            if not self.api_key:
                await asyncio.sleep(2)
                TASKS[task_id]["progress"] = 50
                
                result_img = self._generate_demo_image(style, file_path)
                
                TASKS[task_id]["progress"] = 80
                
                output_filename = f"{task_id}.png"
                output_path = self.settings.output_dir / output_filename
                result_img.save(output_path, 'PNG')
                
                TASKS[task_id]["progress"] = 100
                TASKS[task_id]["status"] = "completed"
                TASKS[task_id]["output_url"] = f"/api/files/{output_filename}"
            else:
                await self._call_tongyi_api(task_id, prompt, image_base64)
            
        except Exception as e:
            TASKS[task_id]["status"] = "failed"
            TASKS[task_id]["error"] = str(e)
    
    async def _call_tongyi_api(self, task_id: str, prompt: str, image_base64: str):
        """调用通义万相 API"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "wanx2.1-t2i-turbo",
            "input": {
                "prompt": prompt,
                "image_base64": image_base64
            }
        }
        
        try:
            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(
                    self.api_url,
                    headers=headers,
                    json=payload
                )
                
                if response.status_code == 200:
                    result = response.json()
                    
                    if "output" in result and "image_url" in result["output"]:
                        image_url = result["output"]["image_url"]
                        
                        async with httpx.AsyncClient(timeout=60.0) as download_client:
                            img_response = await download_client.get(image_url)
                            
                            if img_response.status_code == 200:
                                output_filename = f"{task_id}.png"
                                output_path = self.settings.output_dir / output_filename
                                
                                with open(output_path, 'wb') as f:
                                    f.write(img_response.content)
                                
                                TASKS[task_id]["progress"] = 100
                                TASKS[task_id]["status"] = "completed"
                                TASKS[task_id]["output_url"] = f"/api/files/{output_filename}"
                            else:
                                raise Exception(f"下载图片失败: {img_response.status_code}")
                    else:
                        raise Exception(f"API 返回格式错误: {result}")
                else:
                    raise Exception(f"API 调用失败: {response.status_code} - {response.text}")
                    
        except Exception as e:
            TASKS[task_id]["status"] = "failed"
            TASKS[task_id]["error"] = f"AI 生成失败: {str(e)}"
    
    def _generate_demo_image(self, style: str, source_path: Path) -> Image.Image:
        """生成演示图片（当没有 API Key 时使用）"""
        try:
            from PIL import ImageDraw, ImageFont
            
            source_img = Image.open(source_path)
            width, height = source_img.size
            
            result = Image.new('RGB', (width, height), color=(240, 240, 245))
            draw = ImageDraw.Draw(result)
            
            style_colors = {
                "modern-minimalist": ((200, 210, 220), (255, 255, 255)),
                "nordic": ((230, 220, 210), (255, 250, 245)),
                "chinese-modern": ((220, 210, 200), (250, 245, 240)),
                "light-luxury": ((200, 195, 190), (250, 248, 245)),
                "industrial": ((180, 175, 170), (200, 195, 190)),
                "japanese": ((235, 230, 220), (252, 250, 245))
            }
            
            wall_color, floor_color = style_colors.get(style, ((200, 210, 220), (255, 255, 255)))
            
            margin = int(min(width, height) * 0.1)
            room_width = width - 2 * margin
            room_height = height - 2 * margin
            
            draw.rectangle(
                [margin, margin, width - margin, height - margin],
                fill=floor_color,
                outline=wall_color,
                width=3
            )
            
            wall_thickness = int(min(width, height) * 0.03)
            
            draw.line(
                [margin, margin, width - margin, margin],
                fill=wall_color,
                width=wall_thickness
            )
            draw.line(
                [width - margin, margin, width - margin, height - margin],
                fill=wall_color,
                width=wall_thickness
            )
            draw.line(
                [width - margin, height - margin, margin, height - margin],
                fill=wall_color,
                width=wall_thickness
            )
            draw.line(
                [margin, height - margin, margin, margin],
                fill=wall_color,
                width=wall_thickness
            )
            
            door_width = int(room_width * 0.15)
            draw.arc(
                [margin, height - margin - door_width, margin + door_width, height - margin],
                start=180,
                end=270,
                fill=(139, 90, 43),
                width=2
            )
            
            window_width = int(room_width * 0.2)
            window_x = int(width / 2 - window_width / 2)
            draw.rectangle(
                [window_x, margin, window_x + window_width, margin + wall_thickness * 2],
                fill=(173, 216, 230),
                outline=(100, 149, 237),
                width=1
            )
            
            style_names = {
                "modern-minimalist": "现代简约风格",
                "nordic": "北欧风格",
                "chinese-modern": "新中式风格",
                "light-luxury": "轻奢风格",
                "industrial": "工业风格",
                "japanese": "日式风格"
            }
            
            text = f"AI 生成效果图 - {style_names.get(style, style)}"
            text_bbox = draw.textbbox((0, 0), text)
            text_width = text_bbox[2] - text_bbox[0]
            text_height = text_bbox[3] - text_bbox[1]
            text_x = (width - text_width) // 2
            text_y = height // 2 - text_height // 2
            
            draw.rectangle(
                [text_x - 10, text_y - 10, text_x + text_width + 10, text_y + text_height + 10],
                fill=(255, 255, 255, 230)
            )
            draw.text(
                (text_x, text_y),
                text,
                fill=(60, 60, 60)
            )
            
            try:
                font_size = int(min(width, height) * 0.03)
                font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", font_size)
            except:
                font = ImageFont.load_default()
            
            hint = "（演示模式：请配置通义万相 API Key）"
            hint_bbox = draw.textbbox((0, 0), hint)
            hint_width = hint_bbox[2] - hint_bbox[0]
            draw.text(
                ((width - hint_width) // 2, text_y + text_height + 15),
                hint,
                fill=(180, 180, 180)
            )
            
            return result
            
        except Exception as e:
            return Image.new('RGB', (512, 512), color=(200, 200, 200))
    
    def get_task_status(self, task_id: str) -> Optional[Dict[str, Any]]:
        """获取任务状态"""
        return TASKS.get(task_id)
    
    def get_all_tasks(self) -> list:
        """获取所有任务"""
        return list(TASKS.values())

ai_service = AIService()
