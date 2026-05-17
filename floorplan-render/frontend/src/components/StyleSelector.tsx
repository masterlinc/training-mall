import React from 'react';
import type { StyleType, StyleOption } from '../types';
import { STYLE_OPTIONS } from '../types';

interface StyleSelectorProps {
  selectedStyle: StyleType | null;
  onSelectStyle: (style: StyleType) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onSelectStyle }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">
          <span>🎨</span>
          选择装修风格
        </span>
      </div>
      
      <div className="card-body">
        <div className="style-grid">
          {STYLE_OPTIONS.map((option: StyleOption) => (
            <div
              key={option.key}
              className={`style-option ${selectedStyle === option.key ? 'selected' : ''}`}
              onClick={() => onSelectStyle(option.key)}
            >
              <div className="style-icon">{option.icon}</div>
              <div className="style-label">{option.label}</div>
              <div className="style-desc">{option.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyleSelector;
