import React, { useState } from 'react';
import { Copy, Check, X } from 'lucide-react';
import { Button } from './Button';

interface GeneratedResultProps {
  content: string;
  onClose: () => void;
}

export const GeneratedResult: React.FC<GeneratedResultProps> = ({ content, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all scale-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">Generated Summary</h3>
          <Button variant="ghost" onClick={onClose} className="!p-2">
            <X size={20} />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto bg-gray-50">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
            {content}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button 
            onClick={handleCopy}
            icon={copied ? <Check size={18} /> : <Copy size={18} />}
            className={copied ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </div>
      </div>
    </div>
  );
};