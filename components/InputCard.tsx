import React from 'react';
import { Trash2 } from 'lucide-react';
import { FormField } from '../types';

interface InputCardProps {
  field: FormField;
  onUpdate: (id: string, updates: Partial<FormField>) => void;
  onRemove: (id: string) => void;
  isFirst?: boolean;
}

export const InputCard: React.FC<InputCardProps> = ({ field, onUpdate, onRemove, isFirst }) => {
  return (
    <div className="group relative bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-200">
      <div className="flex gap-4 items-start">
        <div className="flex-1 space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
              Label / Title
            </label>
            <input
              type="text"
              value={field.label}
              onChange={(e) => onUpdate(field.id, { label: e.target.value })}
              placeholder={isFirst ? "e.g., Professor Name" : "Label"}
              className="w-full text-lg font-medium text-gray-900 border-b border-gray-200 focus:border-blue-500 focus:outline-none bg-transparent transition-colors py-1 placeholder-gray-300"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
              Description / Value
            </label>
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