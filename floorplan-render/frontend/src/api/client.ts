import axios, { AxiosProgressEvent } from 'axios';
import type { 
  UploadResponse, 
  GenerateRequest, 
  TaskStatus, 
  HistoryItem,
  APIResponse 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
});

export const uploadFile = async (
  file: File,
  onProgress?: (percent: number) => void
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<APIResponse<UploadResponse>>(
    '/api/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total && onProgress) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    }
  );

  if (response.data.code !== 200) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const generateRender = async (
  request: GenerateRequest
): Promise<{ task_id: string; status: string }> => {
  const response = await apiClient.post<APIResponse<{ task_id: string; status: string }>>(
    '/api/generate',
    request
  );

  if (response.data.code !== 200) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const getTaskStatus = async (taskId: string): Promise<TaskStatus> => {
  const response = await apiClient.get<APIResponse<TaskStatus>>(
    `/api/tasks/${taskId}`
  );

  if (response.data.code !== 200) {
    throw new Error(response.data.message);
  }

  return response.data.data;
};

export const getHistory = async (): Promise<HistoryItem[]> => {
  const response = await apiClient.get<APIResponse<HistoryItem[]>>(
    '/api/history'
  );

  if (response.data.code !== 200) {
    throw new Error(response.data.message);
  }

  return response.data.data || [];
};

export const getFileUrl = (filename: string): string => {
  return `${API_BASE_URL}/api/files/${filename}`;
};

export const downloadFile = async (url: string, filename: string): Promise<void> => {
  const response = await axios.get(url, {
    responseType: 'blob',
  });

  const blob = new Blob([response.data]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await apiClient.get('/health');
    return response.data?.status === 'healthy';
  } catch {
    return false;
  }
};
