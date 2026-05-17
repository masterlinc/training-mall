import io
from pathlib import Path
from typing import List, Tuple, Dict, Any
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.backends.backend_agg import FigureCanvasAgg
import numpy as np
from PIL import Image
from app.config import get_settings

def parse_dxf(input_path: Path) -> Dict[str, Any]:
    """
    解析 DXF 文件并渲染为 PNG 图片
    
    Args:
        input_path: DXF 文件路径
    
    Returns:
        包含渲染图片和几何数据的字典
    """
    try:
        import ezdxf
        from ezdxf import bbox
    except ImportError:
        raise ImportError("请安装 ezdxf 库: pip install ezdxf")
    
    doc = ezdxf.readfile(str(input_path))
    msp = doc.modelspace()
    
    entities_data = []
    all_points = []
    
    for entity in msp:
        entity_type = entity.dxftype()
        
        if entity_type == 'LINE':
            start = entity.dxf.start
            end = entity.dxf.end
            entities_data.append({
                'type': 'LINE',
                'start': (start.x, start.y),
                'end': (end.x, end.y)
            })
            all_points.extend([(start.x, start.y), (end.x, end.y)])
            
        elif entity_type == 'LWPOLYLINE':
            points = []
            for vertex in entity.virtual_entities():
                if hasattr(vertex, 'dxf'):
                    points.append((vertex.dxf.location.x, vertex.dxf.location.y))
            entities_data.append({
                'type': 'LWPOLYLINE',
                'points': points
            })
            all_points.extend(points)
            
        elif entity_type == 'POLYLINE':
            points = []
            for vertex in entity.virtual_entities():
                if hasattr(vertex, 'dxf'):
                    points.append((vertex.dxf.location.x, vertex.dxf.location.y))
            entities_data.append({
                'type': 'POLYLINE',
                'points': points
            })
            all_points.extend(points)
            
        elif entity_type == 'ARC':
            center = entity.dxf.center
            radius = entity.dxf.radius
            start_angle = entity.dxf.start_angle
            end_angle = entity.dxf.end_angle
            entities_data.append({
                'type': 'ARC',
                'center': (center.x, center.y),
                'radius': radius,
                'start_angle': start_angle,
                'end_angle': end_angle
            })
            for angle in np.linspace(np.radians(start_angle), np.radians(end_angle), 20):
                x = center.x + radius * np.cos(angle)
                y = center.y + radius * np.sin(angle)
                all_points.append((x, y))
                
        elif entity_type == 'CIRCLE':
            center = entity.dxf.center
            radius = entity.dxf.radius
            entities_data.append({
                'type': 'CIRCLE',
                'center': (center.x, center.y),
                'radius': radius
            })
            for angle in np.linspace(0, 2*np.pi, 36):
                x = center.x + radius * np.cos(angle)
                y = center.y + radius * np.sin(angle)
                all_points.append((x, y))
                
        elif entity_type in ('TEXT', 'MTEXT'):
            if hasattr(entity.dxf, 'text'):
                text = entity.dxf.text
                insert = entity.dxf.insert
                entities_data.append({
                    'type': 'TEXT',
                    'text': text,
                    'position': (insert.x, insert.y)
                })
                all_points.append((insert.x, insert.y))
    
    if not all_points:
        raise ValueError("DXF 文件中未找到可绘制的几何实体")
    
    min_x = min(p[0] for p in all_points)
    max_x = max(p[0] for p in all_points)
    min_y = min(p[1] for p in all_points)
    max_y = max(p[1] for p in all_points)
    
    width = max_x - min_x
    height = max_y - min_y
    
    if width < 1 or height < 1:
        width = max(width, 100)
        height = max(height, 100)
    
    fig, ax = plt.subplots(figsize=(10, 10 * (height / width) if width > 0 else 10))
    ax.set_facecolor('white')
    fig.patch.set_facecolor('white')
    
    padding = 0.05
    x_range = max_x - min_x
    y_range = max_y - min_y
    ax.set_xlim(min_x - x_range * padding, max_x + x_range * padding)
    ax.set_ylim(min_y - y_range * padding, max_y + y_range * padding)
    ax.set_aspect('equal')
    
    for entity in entities_data:
        if entity['type'] == 'LINE':
            ax.plot(
                [entity['start'][0], entity['end'][0]],
                [entity['start'][1], entity['end'][1]],
                'k-',
                linewidth=0.5
            )
        elif entity['type'] in ('LWPOLYLINE', 'POLYLINE'):
            points = entity['points']
            if len(points) > 1:
                xs = [p[0] for p in points]
                ys = [p[1] for p in points]
                ax.plot(xs, ys, 'k-', linewidth=0.5)
                ax.fill(xs, ys, fill=False, edgecolor='k', linewidth=0.5)
        elif entity['type'] == 'ARC':
            theta = np.linspace(
                np.radians(entity['start_angle']),
                np.radians(entity['end_angle']),
                50
            )
            x = entity['center'][0] + entity['radius'] * np.cos(theta)
            y = entity['center'][1] + entity['radius'] * np.sin(theta)
            ax.plot(x, y, 'k-', linewidth=0.5)
        elif entity['type'] == 'CIRCLE':
            circle = patches.Circle(
                entity['center'],
                entity['radius'],
                fill=False,
                edgecolor='black',
                linewidth=0.5
            )
            ax.add_patch(circle)
        elif entity['type'] == 'TEXT':
            ax.text(
                entity['position'][0],
                entity['position'][1],
                entity['text'],
                fontsize=8,
                ha='left',
                va='bottom'
            )
    
    ax.axis('off')
    plt.tight_layout(pad=0)
    
    canvas = FigureCanvasAgg(fig)
    canvas.draw()
    buf = io.BytesIO()
    canvas.print_png(buf)
    buf.seek(0)
    
    pil_image = Image.open(buf)
    
    max_dimension = 1024
    if pil_image.width > max_dimension or pil_image.height > max_dimension:
        ratio = min(max_dimension / pil_image.width, max_dimension / pil_image.height)
        new_size = (int(pil_image.width * ratio), int(pil_image.height * ratio))
        pil_image = pil_image.resize(new_size, Image.Resampling.LANCZOS)
    
    plt.close(fig)
    
    return {
        'image': pil_image,
        'width': int(width),
        'height': int(height),
        'entities': entities_data,
        'bounding_box': {
            'min_x': min_x,
            'max_x': max_x,
            'min_y': min_y,
            'max_y': max_y
        }
    }
