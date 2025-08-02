import React from 'react';
import { Edit3, Trash2, Calendar, ArrowLeft } from 'lucide-react';
import { Note } from '../../../shared/types';
import { Button } from '../../../shared/components/Button';
import { formatDate } from '../../../shared/utils';

interface NoteViewerProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}

export const NoteViewer: React.FC<NoteViewerProps> = ({
  note,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(note)}
              className="text-white hover:bg-white/20 p-2"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(note.id)}
              className="text-white hover:bg-red-500/20 p-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">{note.title}</h1>
        <div className="flex items-center text-primary-100">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">
            Created {formatDate(note.createdAt)}
            {note.updatedAt !== note.createdAt && (
              <span> • Updated {formatDate(note.updatedAt)}</span>
            )}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
            {note.content || (
              <span className="text-gray-500 dark:text-gray-400 italic">
                This note is empty. Click edit to add content.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
