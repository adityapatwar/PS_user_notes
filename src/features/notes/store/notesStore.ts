import { create } from 'zustand';
import { Note } from '../../../shared/types';
import { notesService } from '../services/notesService';
import { showToast, showAdvancedToast } from '../../../shared/utils/toast';

interface NotesState {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchNotes: () => Promise<void>;
  createNote: (data: { title: string; content: string }) => Promise<void>;
  updateNote: (id: string, data: { title: string; content: string }) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  isLoading: false,
  error: null,

  fetchNotes: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await notesService.getNotes();
      
      if (response.success) {
        // Add frontend-only properties to notes
        const notesWithExtras = response.data.map(note => ({
          ...note,
          category: 'General',
          tags: [],
          priority: 'medium' as const,
          isFavorite: false,
        }));
        
        set({ notes: notesWithExtras, isLoading: false });
      } else {
        throw new Error(response.message || 'Failed to fetch notes');
      }
    } catch (error: any) {
      console.error('Fetch notes error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load notes';
      
      set({ error: errorMessage, isLoading: false });
      showAdvancedToast.error('Failed to Load Notes', errorMessage);
    }
  },

  createNote: async (data) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await notesService.createNote(data);
      
      if (response.success) {
        // Add frontend-only properties
        const newNote = {
          ...response.data,
          category: 'General',
          tags: [],
          priority: 'medium' as const,
          isFavorite: false,
        };
        
        set(state => ({ 
          notes: [newNote, ...state.notes], 
          isLoading: false 
        }));
        
        showAdvancedToast.success(
          'Note Created!', 
          'Your note has been successfully created.'
        );
      } else {
        throw new Error(response.message || 'Failed to create note');
      }
    } catch (error: any) {
      console.error('Create note error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create note';
      
      set({ error: errorMessage, isLoading: false });
      showAdvancedToast.error('Failed to Create Note', errorMessage);
    }
  },

  updateNote: async (id, data) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await notesService.updateNote(id, data);
      
      if (response.success) {
        set(state => ({
          notes: state.notes.map(note => 
            note.id === id 
              ? { ...note, ...data, updatedAt: new Date().toISOString() }
              : note
          ),
          isLoading: false
        }));
        
        showAdvancedToast.success(
          'Note Updated!', 
          'Your changes have been saved successfully.'
        );
      } else {
        throw new Error(response.message || 'Failed to update note');
      }
    } catch (error: any) {
      console.error('Update note error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update note';
      
      set({ error: errorMessage, isLoading: false });
      showAdvancedToast.error('Failed to Update Note', errorMessage);
    }
  },

  deleteNote: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await notesService.deleteNote(id);
      
      if (response.success) {
        set(state => ({
          notes: state.notes.filter(note => note.id !== id),
          isLoading: false
        }));
        
        showAdvancedToast.success(
          'Note Deleted!', 
          'The note has been permanently removed.'
        );
      } else {
        throw new Error(response.message || 'Failed to delete note');
      }
    } catch (error: any) {
      console.error('Delete note error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete note';
      
      set({ error: errorMessage, isLoading: false });
      showAdvancedToast.error('Failed to Delete Note', errorMessage);
    }
  },

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
