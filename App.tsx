import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Plus, Sparkles, FileText, Eraser } from 'lucide-react';
import { FormField } from './types';
import { InputCard } from './components/InputCard';
import { Button } from './components/Button';
import { GeneratedResult } from './components/GeneratedResult';

const App: React.FC = () => {
  const [title, setTitle] = useState("Professor Summary App");
  const [fields, setFields] = useState<FormField[]>([
    { id: '1', label: '', value: '' }
  ]);
  const [showResult, setShowResult] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new field is added
  useEffect(() => {
    if (fields.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [fields.length]);

  const handleAddField = useCallback(() => {
    setFields(prev => [
      ...prev,
      { id: crypto.randomUUID(), label: '', value: '' }
    ]);
  }, []);

  const handleUpdateField = useCallback((id: string, updates: Partial<FormField>) => {
    setFields(prev => prev.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  }, []);

  const handleRemoveField = useCallback((id: string) => {
    setFields(prev => {
      // Don't allow removing the last item, just clear it
      if (prev.length === 1) {
        return [{ ...prev[0], label: '', value: '' }];
      }
      return prev.filter(field => field.id !== id);
    });
  }, []);

  const handleClearAll = useCallback(() => {
    if (window.confirm("Are you sure you want to clear all descriptions? Labels will remain.")) {
      setFields(prev => prev.map(field => ({ ...field, value: '' })));
    }
  }, []);

  const handleGenerate = useCallback(() => {
    // Filter out empty fields to keep output clean, optionally
    // or keep them if strict format required. Let's keep strict but trim whitespace.
    const validFields = fields.filter(f => f.label.trim() || f.value.trim());
    
    if (validFields.length === 0) {
      alert("Please enter at least one field.");
      return;
    }

    const output = validFields.map(field => {
      const label = field.label.trim() || "Untitled";
      const value = field.value.trim() || "N/A";
      return `${label}: ${value}`;
    }).join('\n');

    setGeneratedContent(output);
    setShowResult(true);
  }, [fields]);

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <FileText size={24} />
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 text-2xl font-bold text-gray-800 bg-transparent border-none focus:ring-0 placeholder-gray-400"
            placeholder="Enter App Title..."
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="space-y-6">
          {fields.map((field, index) => (
            <InputCard
              key={field.id}
              field={field}
              onUpdate={handleUpdateField}
              onRemove={handleRemoveField}
              isFirst={index === 0}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Add Button Area */}
        <div className="relative group">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
            <button
                onClick={handleAddField}
                className="inline-flex items-center gap-2 px-6 py-2 border-2 border-dashed border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-500 bg-white hover:bg-gray-50 hover:border-blue-400 hover:text-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <Plus size={18} />
                Add New Field
            </button>
            </div>
        </div>
      </main>

      {/* Floating Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pb-8 pt-12 z-20 pointer-events-none">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4 pointer-events-auto">
          <Button variant="secondary" onClick={handleClearAll} icon={<Eraser size={18}/>} className="hidden sm:flex">
             Clear Values
          </Button>
          
          <Button 
            onClick={handleGenerate} 
            className="flex-1 sm:flex-none sm:w-auto shadow-xl shadow-blue-500/20 text-lg px-8 py-3"
            icon={<Sparkles size={20} />}
          >
            Generate Summary
          </Button>
        </div>
      </div>

      {/* Result Modal */}
      {showResult && (
        <GeneratedResult 
          content={generatedContent} 
          onClose={() => setShowResult(false)} 
        />
      )}
    </div>
  );
};

export default App;