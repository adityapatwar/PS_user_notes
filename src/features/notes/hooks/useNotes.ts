import { useEffect } from 'react';
import { useNotesStore } from '../store/notesStore';
import { notesApi } from '../api/notesApi';
import { CreateNoteData, UpdateNoteData } from '../../../shared/types';

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
      const fetchedNotes = await notesApi.getNotes();
      setNotes(fetchedNotes);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (data: CreateNoteData) => {
    try {
      setLoading(true);
      setError(null);
      const newNote = await notesApi.createNote(data);
      addNote(newNote);
      return newNote;
    } catch (err: any) {
      setError(err.message || 'Failed to create note');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateNoteById = async (id: string, data: UpdateNoteData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedNote = await notesApi.updateNote(id, data);
      updateNote(id, updatedNote);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update note');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteNoteById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await notesApi.deleteNote(id);
      deleteNote(id);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete note');
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
