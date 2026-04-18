import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, ChevronRight, Hash } from 'lucide-react';
import { InfoCard } from '../types';

interface CardManagerProps {
  cards: InfoCard[];
  activeCardId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onAdd: () => void;
  onBack: () => void;
}

export default function CardManager({ 
  cards, 
  activeCardId, 
  onSelect, 
  onDelete, 
  onEdit, 
  onAdd,
  onBack 
}: CardManagerProps) {
  return (
    <div className="h-full bg-clean-bg flex flex-col font-sans select-none relative" style={{ paddingTop: 'var(--safe-area-top)', paddingBottom: 'var(--safe-area-bottom)' }}>
      {/* Top Nav - Clean Minimalism Style */}
      <div className="px-6 h-16 flex items-center justify-between border-b border-clean-border bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="w-10 h-10 flex items-center justify-center text-clean-text-muted hover:text-clean-text active:bg-clean-bg rounded-lg transition-colors border border-transparent hover:border-clean-border"
          >
            <XIcon />
          </button>
          <span className="text-xs font-bold uppercase tracking-widest text-clean-text-muted">Information Cards</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="text-[10px] bg-clean-primary-light text-clean-primary px-3 py-1 rounded-full font-bold">
             {cards.length} Total
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 touch-pan-y">
        <AnimatePresence mode="popLayout">
          {cards.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <div className="w-16 h-16 bg-white border border-clean-border rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Hash className="w-8 h-8 text-clean-text-light" />
              </div>
              <p className="text-sm font-medium text-clean-text-muted">Prepare your information cards</p>
            </motion.div>
          ) : (
            cards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`
                  relative overflow-hidden p-6 rounded-2xl border transition-all cursor-pointer group active:scale-[0.98]
                  ${card.id === activeCardId 
                    ? 'bg-white border-clean-primary shadow-lg shadow-clean-primary/5' 
                    : 'bg-white border-clean-border shadow-sm hover:shadow-md hover:border-clean-text-light/20'
                  }
                `}
                onClick={() => {
                  if ('vibrate' in navigator) navigator.vibrate(5);
                  onSelect(card.id);
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${card.id === activeCardId ? 'text-clean-primary' : 'text-clean-text-light'}`}>
                        {card.title}
                      </span>
                      {card.id === activeCardId && (
                        <div className="w-1.5 h-1.5 bg-clean-primary rounded-full animate-pulse" />
                      )}
                    </div>
                    <p className={`text-xl font-bold tracking-tight line-clamp-1 ${card.id === activeCardId ? 'text-clean-text' : 'text-clean-text-muted'}`}>
                      {card.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onEdit(card.id); }}
                      className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-clean-bg text-clean-text-light hover:text-clean-text transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDelete(card.id); }}
                      className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-red-50 text-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Floating Action Button - Minimalism Style */}
      <div className="absolute bottom-10 right-8">
        <button 
          onClick={onAdd}
          className="w-16 h-16 bg-clean-primary text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-90 transition-all shadow-xl shadow-clean-primary/30"
        >
          <Plus className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  );
}
