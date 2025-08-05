import { api, setApiToken } from './api';
import { LoginData, RegisterData, AuthResponse, ApiResponse, User } from '../types';

export const authService = {
  setToken: (token: string) => {
    setApiToken(token);
  },

  login: async (data: LoginData): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};