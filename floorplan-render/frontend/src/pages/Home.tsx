import React, { useState } from 'react';
import { ConfigProvider, theme, message } from 'antd';
import UploadZone from '../components/UploadZone';
import FilePreview from '../components/FilePreview';
import StyleSelector from '../components/StyleSelector';
import ActionBar from '../components/ActionBar';
import CompareView from '../components/CompareView';
import ThreeViewer from '../components/ThreeViewer';
import type { UploadResponse, StyleType } from '../types';

const Home: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadResponse | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleType | null>(null);
  const [renderResultUrl, setRenderResultUrl] = useState<string | null>(null);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadSuccess = (data: UploadResponse) => {
    setUploadedFile(data);
    setRenderResultUrl(null);
    setCurrentTaskId(null);
    setError(null);
  };

  const handleUploadError = (errorMsg: string) => {
    setError(errorMsg);
  };

  const handleGenerateStart = (taskId: string) => {
    setCurrentTaskId(taskId);
    setRenderResultUrl(null);
    setError(null);
    message.info('开始生成效果图，请稍候...');
  };

  const handleGenerateComplete = (outputUrl: string) => {
    setRenderResultUrl(outputUrl);
    setCurrentTaskId(null);
  };

  const handleGenerateError = (errorMsg: string) => {
    setError(errorMsg);
    setCurrentTaskId(null);
  };

  const handleClearFile = () => {
    setUploadedFile(null);
    setRenderResultUrl(null);
    setCurrentTaskId(null);
    setSelectedStyle(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">🏠</div>
            <span className="logo-text">户型图 AI 生成装修效果图</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">AI 驱动的装修效果图生成</h1>
          <p className="hero-subtitle">
            上传户型图，选择装修风格，AI 智能生成多种风格的效果图，
            轻松预览装修效果，提升设计方案沟通效率
          </p>
        </section>

        <section className="upload-section">
          {!uploadedFile ? (
            <UploadZone
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
            />
          ) : (
            <div className="workspace-section">
              <div className="left-panel">
                <FilePreview
                  fileData={uploadedFile}
                  onClear={handleClearFile}
                />
              </div>
              
              <div className="right-panel">
                <StyleSelector
                  selectedStyle={selectedStyle}
                  onSelectStyle={setSelectedStyle}
                />
                
                <ActionBar
                  fileId={uploadedFile.file_id}
                  selectedStyle={selectedStyle}
                  onGenerateStart={handleGenerateStart}
                  onGenerateComplete={handleGenerateComplete}
                  onGenerateError={handleGenerateError}
                  isGenerating={isGenerating}
                  onGeneratingChange={setIsGenerating}
                />

                {error && (
                  <div className="error-state">
                    <div className="error-state-icon">⚠️</div>
                    <div className="error-state-title">生成失败</div>
                    <div className="error-state-desc">{error}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {uploadedFile && (
          <CompareView
            floorPlanUrl={uploadedFile.preview_url}
            renderResultUrl={renderResultUrl}
            onShow3D={() => setShow3DViewer(true)}
          />
        )}

        <ThreeViewer
          textureUrl={renderResultUrl}
          visible={show3DViewer}
          onClose={() => setShow3DViewer(false)}
        />
      </main>

      <footer className="footer">
        <p>
          户型图 AI 生成装修效果图 · 使用 React + FastAPI 构建
        </p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#E94560',
          borderRadius: 8,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        },
      }}
    >
      <Home />
    </ConfigProvider>
  );
};

export default App;
