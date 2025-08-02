import { apiClient } from '../../../shared/config/api';
import { ApiResponse, AuthTokens, LoginCredentials, RegisterCredentials, User } from '../../../shared/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthTokens>> {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<ApiResponse<User>> {
    const response = await apiClient.post('/auth/register', credentials);
    return response.data;
  },

  async refreshToken(token: string): Promise<ApiResponse<AuthTokens>> {
    const response = await apiClient.post('/auth/refresh', { token });
    return response.data;
  },
};
