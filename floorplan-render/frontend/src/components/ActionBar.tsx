import React, { useState } from 'react';
import { Button, message } from 'antd';
import type { StyleType, TaskStatus } from '../types';
import { generateRender, getTaskStatus, downloadFile } from '../api/client';

interface ActionBarProps {
  fileId: string;
  selectedStyle: StyleType | null;
  onGenerateStart: (taskId: string) => void;
  onGenerateComplete: (outputUrl: string) => void;
  onGenerateError: (error: string) => void;
  isGenerating: boolean;
  onGeneratingChange: (generating: boolean) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({
  fileId,
  selectedStyle,
  onGenerateStart,
  onGenerateComplete,
  onGenerateError,
  isGenerating,
  onGeneratingChange,
}) => {
  const [customPrompt, setCustomPrompt] = useState('');

  const handleGenerate = async () => {
    if (!selectedStyle) {
      message.warning('请先选择装修风格');
      return;
    }

    onGeneratingChange(true);

    try {
      const result = await generateRender({
        file_id: fileId,
        style: selectedStyle,
        custom_prompt: customPrompt || undefined,
      });

      onGenerateStart(result.task_id);

      const pollInterval = setInterval(async () => {
        try {
          const status = await getTaskStatus(result.task_id);
          
          if (status.status === 'completed' && status.output_url) {
            clearInterval(pollInterval);
            onGeneratingChange(false);
            onGenerateComplete(status.output_url);
            message.success('效果图生成成功！');
          } else if (status.status === 'failed') {
            clearInterval(pollInterval);
            onGeneratingChange(false);
            const errorMsg = status.error || '生成失败';
            onGenerateError(errorMsg);
            message.error(errorMsg);
          }
        } catch (error) {
          clearInterval(pollInterval);
          onGeneratingChange(false);
          const errorMsg = error instanceof Error ? error.message : '查询状态失败';
          onGenerateError(errorMsg);
          message.error(errorMsg);
        }
      }, 2000);

      setTimeout(() => {
        clearInterval(pollInterval);
        onGeneratingChange(false);
      }, 300000);

    } catch (error) {
      onGeneratingChange(false);
      const errorMsg = error instanceof Error ? error.message : '生成失败';
      onGenerateError(errorMsg);
      message.error(errorMsg);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          <span>✨</span>
          生成设置
        </span>
      </div>
      
      <div className="card-body">
        <div className="action-buttons">
          <button
            className="btn-primary"
            onClick={handleGenerate}
            disabled={!selectedStyle || isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="loading-spinner"></span>
                生成中...
              </>
            ) : (
              <>
                <span>🚀</span>
                生成效果图
              </>
            )}
          </button>
        </div>

        <div className="custom-prompt-input">
          <label style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px', display: 'block' }}>
            自定义描述（可选）
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="添加额外的设计要求，例如：添加绿植、采用暖色调灯光..."
            disabled={isGenerating}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
