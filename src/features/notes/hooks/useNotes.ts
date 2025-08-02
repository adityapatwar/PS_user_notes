import { useEffect } from 'react';
import { useNotesStore } from '../store/notesStore';
import { notesService } from '../services/notesService';
import { CreateNoteData, UpdateNoteData } from '../../../shared/types';
import { snakeToCamel } from '../../../shared/utils';

export const useNotes = () => {
  const {
    notes,
    selectedNote,
    isLoading,
    error,
    setNotes,
    addNote,
    updateNote,
    deleteNote,
    setSelectedNote,
    setLoading,
    setError,
  } = useNotesStore();

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await notesService.getNotes();
      
      if (response.success && response.data) {
        setNotes(snakeToCamel(response.data));
      } else {
        setError(response.message || 'Failed to fetch notes');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (data: CreateNoteData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await notesService.createNote(data);
      
      if (response.success && response.data) {
        const convertedNote = snakeToCamel(response.data);
        addNote(convertedNote);
        return convertedNote;
      } else {
        setError(response.message || 'Failed to create note');
        return null;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create note');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateNoteById = async (id: string, data: UpdateNoteData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await notesService.updateNote(id, data);
      
      if (response.success) {
        updateNote(id, { ...data, updatedAt: new Date().toISOString() });
        return true;
      } else {
        setError(response.message || 'Failed to update note');
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update note');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteNoteById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await notesService.deleteNote(id);
      
      if (response.success) {
        deleteNote(id);
        return true;
      } else {
        setError(response.message || 'Failed to delete note');
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete note');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    selectedNote,
    isLoading,
    error,
    createNote,
    updateNote: updateNoteById,
    deleteNote: deleteNoteById,
    setSelectedNote,
    refreshNotes: fetchNotes,
  };
};
