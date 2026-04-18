import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, AlertCircle } from 'lucide-react';
import { InfoCard } from '../types';

interface CardEditorProps {
  card?: InfoCard;
  onSave: (card: Omit<InfoCard, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export default function CardEditor({ card, onSave, onCancel }: CardEditorProps) {
  const [title, setTitle] = useState(card?.title || '');
  const [content, setContent] = useState(card?.content || '');
  const [readAloud, setReadAloud] = useState(card?.enableReadAloud ?? true);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      setError('Please fill in both fields');
      return;
    }
    // Simple vibration for feedback
    if ('vibrate' in navigator) navigator.vibrate(10);
    onSave({ title, content, enableReadAloud: readAloud });
  };

  return (
    <div className="h-full bg-clean-bg flex flex-col font-sans select-none" style={{ paddingTop: 'var(--safe-area-top)', paddingBottom: 'var(--safe-area-bottom)' }}>
      {/* Minimalism Header */}
      <div className="px-6 h-16 flex items-center justify-between border-b border-clean-border bg-white">
        <button 
          onClick={onCancel} 
          className="w-10 h-10 flex items-center justify-center text-clean-text-muted hover:text-clean-text active:bg-clean-bg rounded-lg transition-colors border border-transparent hover:border-clean-border"
        >
          <X className="w-6 h-6" />
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-clean-text-muted">
          {card ? 'Edit Information' : 'New Information'}
        </span>
        <button 
          onClick={handleSave}
          className="text-clean-primary font-bold hover:bg-clean-primary/5 px-4 py-2 rounded-lg transition-all active:scale-95"
        >
          Done
        </button>
      </div>

      <div className="flex-1 p-8 space-y-10 overflow-y-auto touch-pan-y">
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-red-50 text-red-500 rounded-xl text-xs font-medium border border-red-100"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}

        {/* Input Fields - Clean Style */}
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold tracking-widest text-clean-text-light ml-1">
              Card Label
            </label>
            <input 
              type="text"
              value={title}
              onChange={(e) => { setTitle(e.target.value); setError(''); }}
              placeholder="e.g. Mobile Number"
              className="w-full bg-clean-input-bg border-none rounded-xl p-5 text-clean-text focus:ring-2 focus:ring-clean-primary/20 transition-all font-medium placeholder:text-clean-text-light/50"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase font-bold tracking-widest text-clean-text-light ml-1">
              Information
            </label>
            <textarea 
              rows={4}
              value={content}
              onChange={(e) => { setContent(e.target.value); setError(''); }}
              placeholder="e.g. 8765 4321"
              className="w-full bg-clean-input-bg border-none rounded-xl p-5 text-clean-text focus:ring-2 focus:ring-clean-primary/20 transition-all resize-none text-3xl font-bold tracking-tighter placeholder:text-clean-text-light/30"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-6 bg-white border border-clean-border rounded-2xl shadow-sm">
          <div className="space-y-1">
            <h3 className="font-bold text-clean-text">Read Aloud</h3>
            <p className="text-xs text-clean-text-muted">Deliver via voice assistance</p>
          </div>
          <button 
            onClick={() => setReadAloud(!readAloud)}
            className={`
              w-14 h-8 rounded-full relative transition-all
              ${readAloud ? 'bg-clean-primary' : 'bg-clean-text-light/30'}
            `}
          >
            <motion.div 
              animate={{ x: readAloud ? 28 : 4 }}
              className="absolute top-1 left-0 w-6 h-6 bg-white rounded-full shadow-md"
            />
          </button>
        </div>
      </div>
      
      <div className="p-8">
        <button 
          onClick={handleSave}
          className="w-full py-5 bg-clean-primary text-white rounded-2xl font-bold transition-all shadow-xl shadow-clean-primary/30 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Save className="w-5 h-5" />
          Save Card
        </button>
      </div>
    </div>
  );
}
