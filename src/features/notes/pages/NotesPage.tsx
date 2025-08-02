import React, { useState } from 'react';
import { Plus, Search, FileText, Loader2 } from 'lucide-react';
import { Layout } from '../../../shared/layout/Layout';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { NoteCard } from '../components/NoteCard';
import { NoteModal } from '../components/NoteModal';
import { NoteViewer } from '../components/NoteViewer';
import { useNotes } from '../hooks/useNotes';
import { Note } from '../../../shared/types';

export const NotesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);

  const {
    notes,
    isLoading,
    error,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
    setViewingNote(null);
  };

  const handleSaveNote = async (data: { title: string; content: string }) => {
    if (editingNote) {
      const success = await updateNote(editingNote.id, data);
      if (success) {
        setIsModalOpen(false);
        setEditingNote(null);
      }
    } else {
      const newNote = await createNote(data);
      if (newNote) {
        setIsModalOpen(false);
      }
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const success = await deleteNote(id);
      if (success && viewingNote?.id === id) {
        setViewingNote(null);
      }
    }
  };

  const handleViewNote = (note: Note) => {
    setViewingNote(note);
  };

  const handleCloseViewer = () => {
    setViewingNote(null);
  };

  if (viewingNote) {
    return (
      <Layout>
        <NoteViewer
          note={viewingNote}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          onBack={handleCloseViewer}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Notes</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'} total
            </p>
          </div>
          <Button onClick={handleCreateNote} size="lg" className="shadow-lg">
            <Plus className="h-5 w-5 mr-2" />
            New Note
          </Button>
        </div>

        {/* Search */}
        <div className="max-w-md">
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-5 w-5" />}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && notes.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && notes.length === 0 && (
          <div className="text-center py-12">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No notes yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get started by creating your first note
            </p>
            <Button onClick={handleCreateNote}>
              <Plus className="h-4 w-4 mr-2" />
              Create Note
            </Button>
          </div>
        )}

        {/* Notes Grid */}
        {!isLoading && filteredNotes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onClick={handleViewNote}
              />
            ))}
          </div>
        )}

        {/* No Search Results */}
        {!isLoading && searchTerm && filteredNotes.length === 0 && notes.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No notes found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>

      {/* Note Modal */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        note={editingNote}
        isLoading={isLoading}
      />
    </Layout>
  );
};
