import React, { useState, useRef, useCallback } from 'react';
import { Progress, message } from 'antd';
import { uploadFile } from '../api/client';
import type { UploadResponse } from '../types';

interface UploadZoneProps {
  onUploadSuccess: (data: UploadResponse) => void;
  onUploadError: (error: string) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onUploadSuccess, onUploadError }) => {
  const [isDragover, setIsDragover] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragover(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragover(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragover(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf', '.dxf'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExt)) {
      message.error('不支持的文件格式，请上传 JPG、PNG、PDF 或 DXF 文件');
      onUploadError('不支持的文件格式');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      message.error('文件大小超过限制（最大 50MB）');
      onUploadError('文件大小超过限制');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const result = await uploadFile(file, (percent) => {
        setUploadProgress(percent);
      });
      message.success('文件上传成功');
      onUploadSuccess(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '上传失败';
      message.error(errorMessage);
      onUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (isUploading) {
    return (
      <div className="upload-zone">
        <div className="upload-progress">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <div style={{ fontSize: '18px', fontWeight: 500, marginBottom: '16px' }}>
            正在上传并解析文件...
          </div>
          <Progress 
            percent={uploadProgress} 
            status="active"
            strokeColor={{
              '0%': '#E94560',
              '100%': '#ff8a9b',
            }}
            style={{ maxWidth: '300px', margin: '0 auto' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`upload-zone ${isDragover ? 'dragover' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="upload-area-hidden"
        accept=".jpg,.jpeg,.png,.pdf,.dxf"
        onChange={handleFileSelect}
      />
      
      <div className="upload-icon">📐</div>
      <div className="upload-title">拖拽户型图文件到这里</div>
      <div className="upload-subtitle">或者点击选择文件</div>
      
      <div className="upload-formats">
        <span className="format-badge">JPG</span>
        <span className="format-badge">PNG</span>
        <span className="format-badge">PDF</span>
        <span className="format-badge">DXF</span>
      </div>
      
      <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
        DWG 格式请转换为 DXF 后上传
      </div>
    </div>
  );
};

export default UploadZone;
