import React, { useState, useRef, useEffect } from 'react';
import { Save, X, Maximize2, Minimize2, Type, AlignLeft } from 'lucide-react';
import { Note } from '../../../shared/types';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Card } from '../../../shared/components/Card';
import { Modal } from '../../../shared/components/Modal';

interface NoteEditorProps {
  note?: Note;
  isOpen: boolean;
  onClose: () => void;
  onSave: (noteData: { title: string; content: string }) => void;
  loading?: boolean;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  isOpen,
  onClose,
  onSave,
  loading = false,
}) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
    setHasUnsavedChanges(false);
  }, [note, isOpen]);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(content.length);
  }, [content]);

  useEffect(() => {
    // Auto-save functionality
    if (hasUnsavedChanges && (title.trim() || content.trim())) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      autoSaveTimeoutRef.current = setTimeout(() => {
        handleSave(true);
      }, 2000); // Auto-save after 2 seconds of inactivity
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [title, content, hasUnsavedChanges]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setHasUnsavedChanges(true);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSave = (isAutoSave = false) => {
    if (!title.trim() && !content.trim()) return;
    
    onSave({ title: title.trim() || 'Untitled', content: content.trim() });
    setHasUnsavedChanges(false);
    
    if (!isAutoSave) {
      onClose();
    }
  };

  const handleClose = () => {
    if (hasUnsavedChanges && (title.trim() || content.trim())) {
      if (window.confirm('You have unsaved changes. Do you want to save before closing?')) {
        handleSave();
        return;
      }
    }
    onClose();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const insertText = (textToInsert: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newContent = content.substring(0, start) + textToInsert + content.substring(end);
      setContent(newContent);
      setHasUnsavedChanges(true);
      
      // Restore cursor position
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + textToInsert.length;
          textareaRef.current.selectionEnd = start + textToInsert.length;
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const EditorContent = () => (
    <div className="space-y-4">
      {/* Title Input */}
      <Input
        placeholder="Note title..."
        value={title}
        onChange={handleTitleChange}
        variant="filled"
        inputSize="lg"
        icon={<Type className="h-4 w-4" />}
        className="text-lg font-semibold"
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertText('**Bold text**')}
            className="text-xs"
          >
            <strong>B</strong>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertText('*Italic text*')}
            className="text-xs italic"
          >
            I
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => insertText('\n- List item')}
            className="text-xs"
          >
            <AlignLeft className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
          {hasUnsavedChanges && (
            <span className="text-amber-500 flex items-center">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-1 animate-pulse" />
              Unsaved
            </span>
          )}
        </div>
      </div>

      {/* Content Textarea */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          placeholder="Start writing your note..."
          value={content}
          onChange={handleContentChange}
          className="w-full min-h-[300px] p-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none transition-all duration-200"
          style={{ height: 'auto' }}
        />
        
        {/* Character limit indicator */}
        {charCount > 1000 && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
            {charCount > 5000 ? (
              <span className="text-red-500">Character limit approaching</span>
            ) : (
              <span>{charCount}/5000</span>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSave()}
            loading={loading}
            disabled={!title.trim() && !content.trim()}
          >
            <Save className="h-4 w-4 mr-2" />
            {note ? 'Update Note' : 'Save Note'}
          </Button>
        </div>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {note ? 'Edit Note' : 'New Note'}
              </h2>
              <Button
                variant="ghost"
                onClick={toggleFullscreen}
                className="p-2"
              >
                <Minimize2 className="h-5 w-5" />
              </Button>
            </div>
            <EditorContent />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={note ? 'Edit Note' : 'New Note'}
      size="lg"
      closeOnOverlayClick={false}
    >
      <EditorContent />
    </Modal>
  );
};
