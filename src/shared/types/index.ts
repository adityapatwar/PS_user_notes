// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Auth Types
export interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

// Note Types
export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  // Additional frontend-only properties
  category?: string;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  isFavorite?: boolean;
}

export interface CreateNoteData {
  title: string;
  content: string;
}

export interface UpdateNoteData {
  title: string;
  content: string;
}
