import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';
import { LoginCredentials, RegisterCredentials } from '../../../shared/types';

export const useAuth = () => {
  const { setAuth, setLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      
      if (response.success && response.data) {
        // Mock user data since login only returns token
        const mockUser = {
          id: 'user_123',
          email: credentials.email,
          role: 'user',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setAuth(mockUser, response.data.token);
        return true;
      } else {
        setError(response.message || 'Login failed');
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(credentials);
      
      if (response.success) {
        return true;
      } else {
        setError(response.message || 'Registration failed');
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, error, setError };
};
