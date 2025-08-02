import React from 'react';
import { Edit3, Trash2, Clock, Calendar } from 'lucide-react';
import { Note } from '../../../shared/types';
import { Button } from '../../../shared/components/Button';
import { truncateText, formatApiDate } from '../../../shared/utils';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onClick: (note: Note) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
  onClick,
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(note);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(note.id);
  };

  return (
    <div
      onClick={() => onClick(note)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all duration-200 hover:scale-[1.02] animate-fade-in group"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
          {note.title}
        </h3>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
        {truncateText(note.content, 150)}
      </p>
      
      <div className="flex flex-col space-y-1 pt-2 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3 mr-2 flex-shrink-0" />
          <span className="truncate">Created {formatApiDate(note.createdAt)}</span>
        </div>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3 mr-2 flex-shrink-0" />
          <span className="truncate">Updated {formatApiDate(note.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};
