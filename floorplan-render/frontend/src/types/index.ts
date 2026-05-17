export type StyleType = 
  | 'modern-minimalist' 
  | 'nordic' 
  | 'chinese-modern' 
  | 'light-luxury' 
  | 'industrial' 
  | 'japanese';

export interface UploadResponse {
  file_id: string;
  type: 'image' | 'pdf' | 'cad';
  preview_url: string;
  width: number;
  height: number;
  page_count?: number;
  original_filename: string;
}

export interface GenerateRequest {
  file_id: string;
  style: StyleType;
  custom_prompt?: string;
}

export interface TaskStatus {
  task_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  output_url?: string;
  error?: string;
}

export interface HistoryItem {
  task_id: string;
  file_id: string;
  original_filename: string;
  style: string;
  status: string;
  output_url?: string;
  created_at: string;
}

export interface APIResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface StyleOption {
  key: StyleType;
  label: string;
  icon: string;
  description: string;
}

export const STYLE_OPTIONS: StyleOption[] = [
  {
    key: 'modern-minimalist',
    label: '现代简约',
    icon: '◇',
    description: 'Clean lines, functional design'
  },
  {
    key: 'nordic',
    label: '北欧风',
    icon: '❋',
    description: 'Light woods, cozy atmosphere'
  },
  {
    key: 'chinese-modern',
    label: '新中式',
    icon: '☯',
    description: 'Traditional elegance, modern comfort'
  },
  {
    key: 'light-luxury',
    label: '轻奢风',
    icon: '✦',
    description: 'Sophisticated luxury, refined taste'
  },
  {
    key: 'industrial',
    label: '工业风',
    icon: '⚙',
    description: 'Raw aesthetics, urban style'
  },
  {
    key: 'japanese',
    label: '日式风',
    icon: '卍',
    description: 'Zen harmony, minimalist beauty'
  }
];
