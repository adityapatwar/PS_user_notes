// Mock API for notes - replace with actual API calls
import { Note, CreateNoteData, UpdateNoteData } from '../../../shared/types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data storage
let mockNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to Your Notes App',
    content: 'This is your first note! You can create, edit, and delete notes here. The app supports rich text editing and has a beautiful modern interface.',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: '2',
    title: 'Meeting Notes - Project Planning',
    content: 'Discussed the new project timeline and deliverables:\n\n- Phase 1: Research and planning (2 weeks)\n- Phase 2: Design and prototyping (3 weeks)\n- Phase 3: Development (6 weeks)\n- Phase 4: Testing and deployment (2 weeks)\n\nNext meeting scheduled for Friday at 2 PM.',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '3',
    title: 'Ideas for Weekend',
    content: 'Things I want to do this weekend:\n\n1. Visit the new art gallery downtown\n2. Try that new restaurant on Main Street\n3. Go for a hike in the mountains\n4. Read the book I bought last month\n5. Organize my workspace',
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
];

export const notesApi = {
  async getNotes(): Promise<Note[]> {
    await delay(500); // Simulate network delay
    return [...mockNotes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  },

  async createNote(data: CreateNoteData): Promise<Note> {
    await delay(300);
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      content: data.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockNotes.unshift(newNote);
    return newNote;
  },

  async updateNote(id: string, data: UpdateNoteData): Promise<Note> {
    await delay(300);
    const noteIndex = mockNotes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      throw new Error('Note not found');
    }
    
    const updatedNote: Note = {
      ...mockNotes[noteIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    mockNotes[noteIndex] = updatedNote;
    return updatedNote;
  },

  async deleteNote(id: string): Promise<void> {
    await delay(200);
    const noteIndex = mockNotes.findIndex(note => note.id === id);
    if (noteIndex === -1) {
      throw new Error('Note not found');
    }
    mockNotes.splice(noteIndex, 1);
  },
};
