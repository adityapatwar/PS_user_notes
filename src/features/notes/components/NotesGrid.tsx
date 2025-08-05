import React, { useState } from 'react';
import { Grid, List, Search, Filter, Plus } from 'lucide-react';
import { Note } from '../../../shared/types';
import { NoteCard } from './NoteCard';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Card } from '../../../shared/components/Card';
import { Skeleton } from '../../../shared/components/Skeleton';

interface NotesGridProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onView: (note: Note) => void;
  onCreateNew: () => void;
  loading?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const NotesGrid: React.FC<NotesGridProps> = ({
  notes,
  onEdit,
  onDelete,
  onView,
  onCreateNew,
  loading = false,
  searchQuery = '',
  onSearchChange,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'created' | 'updated' | 'title'>('updated');
  const [filterBy, setFilterBy] = useState<'all' | 'recent' | 'old'>('all');

  const filteredAndSortedNotes = React.useMemo(() => {
    let filtered = [...notes];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply date filter
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (filterBy === 'recent') {
      filtered = filtered.filter(note => new Date(note.updatedAt) > weekAgo);
    } else if (filterBy === 'old') {
      filtered = filtered.filter(note => new Date(note.updatedAt) < monthAgo);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'updated':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    return filtered;
  }, [notes, searchQuery, sortBy, filterBy]);

  const LoadingSkeleton = () => (
    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} padding="md" className="animate-pulse">
          <Skeleton variant="text" className="h-6 w-3/4 mb-3" />
          <Skeleton variant="text" lines={3} className="mb-4" />
          <div className="flex justify-between items-center">
            <Skeleton variant="text" className="h-4 w-24" />
            <div className="flex space-x-2">
              <Skeleton variant="rectangular" className="h-8 w-8 rounded" />
              <Skeleton variant="rectangular" className="h-8 w-8 rounded" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const EmptyState = () => (
    <Card variant="glass" padding="xl" className="text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {searchQuery ? 'No notes found' : 'No notes yet'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {searchQuery 
            ? `No notes match "${searchQuery}". Try adjusting your search.`
            : 'Start by creating your first note to capture your thoughts and ideas.'
          }
        </p>
        <Button
          variant="gradient"
          onClick={onCreateNew}
          icon={<Plus className="h-4 w-4" />}
        >
          Create Your First Note
        </Button>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <Skeleton variant="text" className="h-8 w-48" />
          <div className="flex gap-2">
            <Skeleton variant="rectangular" className="h-10 w-32 rounded-lg" />
            <Skeleton variant="rectangular" className="h-10 w-24 rounded-lg" />
          </div>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Notes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredAndSortedNotes.length} {filteredAndSortedNotes.length === 1 ? 'note' : 'notes'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            icon={viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          >
            {viewMode === 'grid' ? 'List' : 'Grid'}
          </Button>
          
          <Button
            variant="gradient"
            onClick={onCreateNew}
            icon={<Plus className="h-4 w-4" />}
          >
            New Note
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card padding="md" className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              icon={<Search className="h-4 w-4" />}
              variant="filled"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            >
              <option value="updated">Last Updated</option>
              <option value="created">Date Created</option>
              <option value="title">Title</option>
            </select>
            
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            >
              <option value="all">All Notes</option>
              <option value="recent">Recent (7 days)</option>
              <option value="old">Older (30+ days)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Notes Grid/List */}
      {filteredAndSortedNotes.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredAndSortedNotes.map((note, index) => (
            <div
              key={note.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <NoteCard
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
                onClick={onView}
                variant={viewMode === 'list' ? 'compact' : index === 0 ? 'featured' : 'default'}
              />
            </div>
          ))}
        </div>
      )}

      {/* Load More Button (for future pagination) */}
      {filteredAndSortedNotes.length > 0 && filteredAndSortedNotes.length % 12 === 0 && (
        <div className="text-center pt-6">
          <Button variant="outline" size="lg">
            Load More Notes
          </Button>
        </div>
      )}
    </div>
  );
};
