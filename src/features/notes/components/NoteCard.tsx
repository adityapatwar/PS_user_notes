import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Star, StarOff, Calendar, Tag } from 'lucide-react';
import { Note } from '../types/note';
import { Card } from '../../../shared/components/Card';
import { Button } from '../../../shared/components/Button';
import { formatDistanceToNow, isValid, parseISO } from 'date-fns';
import { showToast } from '../../../shared/utils/toast';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    onEdit(note);
    setShowMenu(false);
    showToast.info('Opening editor...', 'You can now edit your note.');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
      setShowMenu(false);
      showToast.success('Note deleted', 'Your note has been successfully deleted.');
    }
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(note.id);
    setShowMenu(false);
    showToast.success(
      note.isFavorite ? 'Removed from favorites' : 'Added to favorites',
      note.isFavorite ? 'Note removed from your favorites.' : 'Note added to your favorites.'
    );
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Safe date formatting with error handling
  const formatSafeDate = (dateValue: string | Date | undefined) => {
    try {
      if (!dateValue) {
        return 'Unknown date';
      }

      let date: Date;
      
      if (typeof dateValue === 'string') {
        // Try parsing ISO string first
        date = parseISO(dateValue);
        
        // If parseISO fails, try new Date()
        if (!isValid(date)) {
          date = new Date(dateValue);
        }
        
        // If still invalid, try parsing as timestamp
        if (!isValid(date)) {
          const timestamp = parseInt(dateValue, 10);
          if (!isNaN(timestamp)) {
            date = new Date(timestamp);
          }
        }
      } else {
        date = dateValue;
      }

      // Final validation
      if (!isValid(date)) {
        console.warn('Invalid date value:', dateValue);
        return 'Invalid date';
      }

      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Date formatting error:', error, 'for value:', dateValue);
      return 'Date error';
    }
  };

  return (
    <Card
      variant="elevated"
      className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-dark-surface border-light-border dark:border-dark-border"
    >
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text truncate group-hover:text-primary-600 dark:group-hover:text-secondary-400 transition-colors">
              {note.title}
            </h3>
            <div className="flex items-center space-x-3 mt-1">
              <div className="flex items-center text-xs text-light-textMuted dark:text-dark-textMuted">
                <Calendar className="h-3 w-3 mr-1 icon-theme-muted" />
                {formatSafeDate(note.updatedAt)}
              </div>
              {note.category && (
                <div className="flex items-center text-xs text-primary-600 dark:text-secondary-400">
                  <Tag className="h-3 w-3 mr-1" />
                  {note.category}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1 ml-2">
            {note.isFavorite && (
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
            )}
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMenu(!showMenu)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-light-surface dark:hover:bg-dark-bg"
              >
                <MoreVertical className="h-4 w-4 icon-theme" />
              </Button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-dark-surface rounded-lg shadow-lg border border-light-border dark:border-dark-border z-10">
                  <div className="py-1">
                    <button
                      onClick={handleEdit}
                      className="w-full px-4 py-2 text-left text-sm text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-surface dark:hover:bg-dark-bg flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-3 icon-theme" />
                      Edit note
                    </button>
                    <button
                      onClick={handleToggleFavorite}
                      className="w-full px-4 py-2 text-left text-sm text-light-textSecondary dark:text-dark-textSecondary hover:bg-light-surface dark:hover:bg-dark-bg flex items-center"
                    >
                      {note.isFavorite ? (
                        <>
                          <StarOff className="h-4 w-4 mr-3 icon-theme" />
                          Remove from favorites
                        </>
                      ) : (
                        <>
                          <Star className="h-4 w-4 mr-3 icon-theme" />
                          Add to favorites
                        </>
                      )}
                    </button>
                    <div className="border-t border-light-border dark:border-dark-border my-1"></div>
                    <button
                      onClick={handleDelete}
                      className="w-full px-4 py-2 text-left text-sm text-error-light dark:text-error-dark hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-3" />
                      Delete note
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
            {truncateContent(note.content)}
          </p>
        </div>

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {note.tags.slice(0, 3).map((tag, index) => (
              <span
                key={`tag-${note.id}-${index}-${tag}`}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-secondary-900/30 text-primary-700 dark:text-secondary-300"
              >
                {tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span 
                key={`more-tags-${note.id}`}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-light-surface dark:bg-dark-bg text-light-textMuted dark:text-dark-textMuted"
              >
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-light-border dark:border-dark-border">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              note.priority === 'high' ? 'bg-red-500' :
              note.priority === 'medium' ? 'bg-yellow-500' :
              'bg-green-500'
            }`}></div>
            <span className="text-xs text-light-textMuted dark:text-dark-textMuted capitalize">
              {note.priority} priority
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-50 dark:hover:bg-secondary-900/20 text-primary-600 dark:text-secondary-400"
          >
            Open
          </Button>
        </div>
      </div>
    </Card>
  );
};
