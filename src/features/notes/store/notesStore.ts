import { create } from 'zustand';
import { Note } from '../../../shared/types';

interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
  isLoading: boolean;
  error: string | null;
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setSelectedNote: (note: Note | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  selectedNote: null,
  isLoading: false,
  error: null,
  setNotes: (notes) => set({ notes }),
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  updateNote: (id, updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...updatedNote } : note
      ),
      selectedNote: state.selectedNote?.id === id 
        ? { ...state.selectedNote, ...updatedNote } 
        : state.selectedNote,
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
      selectedNote: state.selectedNote?.id === id ? null : state.selectedNote,
    })),
  setSelectedNote: (note) => set({ selectedNote: note }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
