import axios from 'axios';
import { LoginRequest, LoginResponse, AcquisitionData } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },
};

export const acquisitionService = {
  saveAcquisition: async (data: AcquisitionData): Promise<AcquisitionData> => {
    const response = await api.post<AcquisitionData>('/acquisitions', data);
    return response.data;
  },

  getAcquisitions: async (): Promise<AcquisitionData[]> => {
    const response = await api.get<AcquisitionData[]>('/acquisitions');
    return response.data;
  },

  getAcquisitionById: async (id: string): Promise<AcquisitionData> => {
    const response = await api.get<AcquisitionData>(`/acquisitions/${id}`);
    return response.data;
  },

  updateAcquisition: async (id: string, data: AcquisitionData): Promise<AcquisitionData> => {
    const response = await api.put<AcquisitionData>(`/acquisitions/${id}`, data);
    return response.data;
  },

  confirmAcquisition: async (id: string): Promise<void> => {
    await api.post(`/acquisitions/${id}/confirm`);
  },
};

export default api;
