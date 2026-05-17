import React from 'react';
import { Button } from 'antd';
import { getFileUrl, downloadFile } from '../api/client';

interface CompareViewProps {
  floorPlanUrl: string;
  renderResultUrl: string | null;
  onShow3D: () => void;
}

const CompareView: React.FC<CompareViewProps> = ({ 
  floorPlanUrl, 
  renderResultUrl, 
  onShow3D 
}) => {
  const handleDownloadResult = async () => {
    if (renderResultUrl) {
      try {
        await downloadFile(
          getFileUrl(renderResultUrl.split('/').pop() || ''),
          'floorplan-render-result.png'
        );
      } catch (error) {
        console.error('Download failed:', error);
      }
    }
  };

  return (
    <div className="compare-section">
      <div className="compare-container">
        <div className="compare-panel">
          <div className="compare-panel-header">
            <span className="compare-panel-title">📐 户型图</span>
          </div>
          <div className="compare-panel-body">
            <img 
              src={getFileUrl(floorPlanUrl.split('/').pop() || '')} 
              alt="Floor Plan" 
            />
          </div>
        </div>

        <div className="compare-panel">
          <div className="compare-panel-header">
            <span className="compare-panel-title">🎨 效果图</span>
            {renderResultUrl && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="small" onClick={onShow3D}>
                  3D 预览
                </Button>
                <Button size="small" type="primary" onClick={handleDownloadResult}>
                  下载
                </Button>
              </div>
            )}
          </div>
          <div className="compare-panel-body">
            {renderResultUrl ? (
              <img 
                src={getFileUrl(renderResultUrl.split('/').pop() || '')} 
                alt="Render Result" 
              />
            ) : (
              <div className="compare-placeholder">
                <div className="compare-placeholder-icon">🎨</div>
                <div className="compare-placeholder-text">
                  选择风格后点击「生成效果图」
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareView;
