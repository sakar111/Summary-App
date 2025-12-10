import React, { useState } from 'react';
import { Trash2, GripVertical } from 'lucide-react';
import { FormField } from '../types';

interface InputCardProps {
  field: FormField;
  index: number;
  onUpdate: (id: string, updates: Partial<FormField>) => void;
  onRemove: (id: string) => void;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  isFirst?: boolean;
}

export const InputCard: React.FC<InputCardProps> = ({ 
  field, 
  index,
  onUpdate, 
  onRemove, 
  onDragStart,
  onDragEnter,
  onDragEnd,
  isFirst 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    // Setting effect allowed helps with cursor feedback
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(index);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onDragEnd();
  };

  return (
    <div 
      draggable
      onDragStart={handleDragStart}
      onDragEnter={() => onDragEnter(index)}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => e.preventDefault()} // Necessary to allow dropping
      className={`group relative bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-[0.98] border-blue-400 border-dashed' : 'hover:shadow-md hover:border-blue-200'
      }`}
    >
      <div className="flex gap-4 items-start">
        {/* Drag Handle */}
        <div className="mt-2 cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors -ml-2">
          <GripVertical size={20} />
        </div>

        <div className="flex-1 space-y-5">
          <div className="space-y-1.5">
            <input
              type="text"
              value={field.label}
              onChange={(e) => onUpdate(field.id, { label: e.target.value })}
              placeholder={isFirst ? "e.g., Professor Name" : "Label"}
              className="w-full text-lg font-bold text-gray-800 border-b border-transparent focus:border-blue-500 focus:outline-none bg-transparent transition-all py-1 placeholder-gray-300 hover:border-gray-200"
            />
          </div>
          
          <div className="space-y-1.5">
            <textarea
              value={field.value}
              onChange={(e) => onUpdate(field.id, { value: e.target.value })}
              placeholder={isFirst ? "e.g., Dr. Jane Smith" : "Enter description..."}
              rows={3}
              className="w-full text-gray-700 bg-gray-50 rounded-lg p-3 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all resize-y placeholder-gray-400 leading-relaxed"
            />
          </div>
        </div>

        <button
          onClick={() => onRemove(field.id)}
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
          title="Remove field"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};