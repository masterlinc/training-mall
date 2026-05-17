import React from 'react';
import { Button, Tag } from 'antd';
import type { UploadResponse } from '../types';
import { getFileUrl } from '../api/client';

interface FilePreviewProps {
  fileData: UploadResponse;
  onClear: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileData, onClear }) => {
  const typeLabels: Record<string, { text: string; color: string }> = {
    image: { text: '图片', color: '#52c41a' },
    pdf: { text: 'PDF', color: '#faad14' },
    cad: { text: 'CAD', color: '#1890ff' },
  };

  const typeInfo = typeLabels[fileData.type] || { text: '未知', color: '#8c8c8c' };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          <span>📋</span>
          文件预览
        </span>
        <Button 
          type="text" 
          size="small" 
          onClick={onClear}
          style={{ color: 'var(--color-text-secondary)' }}
        >
          清除
        </Button>
      </div>
      
      <div className="card-body">
        <div className="preview-container">
          <img
            src={getFileUrl(fileData.file_id + '.png')}
            alt={fileData.original_filename}
            className="preview-image"
          />
        </div>
        
        <div className="file-info">
          <div className="file-info-item">
            <div className="file-info-label">文件名</div>
            <div className="file-info-value" style={{ wordBreak: 'break-all' }}>
              {fileData.original_filename}
            </div>
          </div>
          <div className="file-info-item">
            <div className="file-info-label">文件类型</div>
            <div className="file-info-value">
              <Tag color={typeInfo.color}>{typeInfo.text}</Tag>
            </div>
          </div>
          <div className="file-info-item">
            <div className="file-info-label">尺寸</div>
            <div className="file-info-value">
              {fileData.width} × {fileData.height} px
            </div>
          </div>
          {fileData.page_count && (
            <div className="file-info-item">
              <div className="file-info-label">PDF 页数</div>
              <div className="file-info-value">{fileData.page_count} 页</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
