import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter, Grid, List, Star, Calendar, Tag } from 'lucide-react';
import { useNotesStore } from '../store/notesStore';
import { useAuthStore } from '../../auth/store/authStore';
import { NoteCard } from '../components/NoteCard';
import { NoteEditor } from '../components/NoteEditor';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Card } from '../../../shared/components/Card';
import { ThemeToggle } from '../../../shared/components/ThemeToggle';
import { ErrorBoundary } from '../../../shared/components/ErrorBoundary';
import { Note } from '../../../shared/types';

export const NotesPage: React.FC = () => {
  const { notes, isLoading, fetchNotes, createNote, updateNote, deleteNote } = useNotesStore();
  const { user, logout } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterBy, setFilterBy] = useState<'all' | 'favorites' | 'recent'>('all');

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (filterBy) {
      case 'favorites':
        return matchesSearch && note.isFavorite;
      case 'recent':
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        return matchesSearch && new Date(note.updatedAt) > threeDaysAgo;
      default:
        return matchesSearch;
    }
  });

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };

  const handleSaveNote = async (data: { title: string; content: string }) => {
    if (selectedNote) {
      await updateNote(selectedNote.id, data);
    } else {
      await createNote(data);
    }
    setIsEditorOpen(false);
    setSelectedNote(null);
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
  };

  const handleToggleFavorite = (id: string) => {
    // This would typically call an API endpoint to update the favorite status
    // For now, we'll just update the local state
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    );
    // Update the store directly for this demo feature
    useNotesStore.setState({ notes: updatedNotes });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Header */}
      <header className="bg-white dark:bg-dark-surface border-b border-light-border dark:border-dark-border sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-dark-surface/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-secondary-500 dark:to-secondary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <h1 className="text-xl font-bold text-light-text dark:text-dark-text">
                  My Notes
                </h1>
              </div>
              
              <div className="hidden sm:flex items-center space-x-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                <span>•</span>
                <span>{notes.length} notes</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline text-sm text-light-textSecondary dark:text-dark-textSecondary">
                Welcome, {user?.email}
              </span>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-text dark:hover:text-dark-text"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-4 w-4 icon-theme-muted" />}
              variant="filled"
              className="bg-white dark:bg-dark-surface border-light-border dark:border-dark-border"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="px-3 py-2 bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg text-sm text-light-text dark:text-dark-text focus:ring-2 focus:ring-primary-500 dark:focus:ring-secondary-500"
            >
              <option value="all">All Notes</option>
              <option value="favorites">Favorites</option>
              <option value="recent">Recent</option>
            </select>

            <div className="flex items-center bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none border-r border-light-border dark:border-dark-border"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="primary"
              onClick={handleCreateNote}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Note</span>
            </Button>
          </div>
        </div>

        {/* Notes Grid/List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-secondary-500"></div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <Card className="text-center py-12 bg-white dark:bg-dark-surface border-light-border dark:border-dark-border">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-light-surface dark:bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-light-textMuted dark:text-dark-textMuted" />
              </div>
              <h3 className="text-lg font-medium text-light-text dark:text-dark-text mb-2">
                {searchTerm ? 'No notes found' : 'No notes yet'}
              </h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters'
                  : 'Create your first note to get started organizing your thoughts'
                }
              </p>
              {!searchTerm && (
                <Button variant="primary" onClick={handleCreateNote}>
                  Create Your First Note
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {filteredNotes.map((note) => (
              <ErrorBoundary key={`note-${note.id}`}>
                <NoteCard
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                  onToggleFavorite={handleToggleFavorite}
                />
              </ErrorBoundary>
            ))}
          </div>
        )}
      </main>

      {/* Note Editor Modal */}
      {isEditorOpen && (
        <ErrorBoundary>
          <NoteEditor
            note={selectedNote}
            onSave={handleSaveNote}
            onClose={() => {
              setIsEditorOpen(false);
              setSelectedNote(null);
            }}
          />
        </ErrorBoundary>
      )}
    </div>
  );
};
