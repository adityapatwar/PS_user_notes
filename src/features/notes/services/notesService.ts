import { apiClient } from '../../../shared/config/api';
import { ApiResponse, Note, CreateNoteData, UpdateNoteData } from '../../../shared/types';

export const notesService = {
  async getNotes(): Promise<ApiResponse<Note[]>> {
    const response = await apiClient.get('/notes');
    return response.data;
  },

  async getNoteById(id: string): Promise<ApiResponse<Note>> {
    const response = await apiClient.get(`/notes/${id}`);
    return response.data;
  },

  async createNote(data: CreateNoteData): Promise<ApiResponse<Note>> {
    const response = await apiClient.post('/notes', data);
    return response.data;
  },

  async updateNote(id: string, data: UpdateNoteData): Promise<ApiResponse<null>> {
    const response = await apiClient.put(`/notes/${id}`, data);
    return response.data;
  },

  async deleteNote(id: string): Promise<ApiResponse<null>> {
    const response = await apiClient.delete(`/notes/${id}`);
    return response.data;
  },
};
