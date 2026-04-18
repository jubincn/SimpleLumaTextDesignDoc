import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Menu, X, Figma } from 'lucide-react';
import { InfoCard } from '../types';

interface MainDisplayProps {
  card: InfoCard | null;
  onOpenMenu: () => void;
  onOpenDesignSystem: () => void;
}

export default function MainDisplay({ card, onOpenMenu, onOpenDesignSystem }: MainDisplayProps) {
  const [showControls, setShowControls] = useState(true);
  const [fontSize, setFontSize] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [showControls]);

  useEffect(() => {
    const scaleText = () => {
      if (!containerRef.current || !textRef.current || !card) return;

      const container = containerRef.current;
      const text = textRef.current;
      
      let low = 1;
      let high = 500;
      let optimal = 1;

      // Keep measuring until we find the largest size that fits
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = `${mid}px`;
        
        if (text.scrollWidth <= container.clientWidth * 0.95 && text.scrollHeight <= container.clientHeight * 0.9) {
          optimal = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      
      setFontSize(optimal);
    };

    scaleText();
    window.addEventListener('resize', scaleText);
    return () => window.removeEventListener('resize', scaleText);
  }, [card]);

  const speak = () => {
    if (!card) return;
    const utterance = new SpeechSynthesisUtterance(card.content);
    window.speechSynthesis.speak(utterance);
  };

  if (!card) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-clean-text-muted">
        <p className="mb-4 font-medium">No card selected</p>
        <button 
          onClick={onOpenMenu}
          className="px-8 py-4 bg-clean-primary shadow-lg shadow-clean-primary/20 text-white rounded-xl font-bold transition-all active:scale-95"
        >
          Open Information Cards
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-clean-bg flex items-center justify-center overflow-hidden"
      onClick={() => setShowControls(true)}
    >
      {/* Background Subtle Grid - Minimalist style */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-clean-text) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Main Content */}
      <motion.div
        key={card.id + card.content}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full h-full flex items-center justify-center px-8"
      >
        <div 
          ref={textRef}
          className="font-black text-clean-text text-center leading-none tracking-tighter break-all whitespace-pre-wrap select-none"
          style={{ fontSize: `${fontSize}px` }}
        >
          {card.content}
        </div>
      </motion.div>

      {/* Overlay Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-0 pointer-events-none p-8"
          >
            {/* Top Right: Read Aloud */}
            <div className="absolute top-8 right-8 pointer-events-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); speak(); }}
                className="w-14 h-14 bg-white/90 backdrop-blur-md shadow-lg shadow-black/5 hover:bg-white rounded-2xl transition-all border border-clean-border flex items-center justify-center active:scale-90"
              >
                <Volume2 className="w-6 h-6 text-clean-primary" />
              </button>
            </div>

            {/* Bottom Right: Navigation */}
            <div className="absolute bottom-8 right-8 pointer-events-auto flex flex-col gap-4">
               <button 
                onClick={(e) => { e.stopPropagation(); onOpenDesignSystem(); }}
                className="w-14 h-14 bg-white/90 backdrop-blur-md shadow-lg hover:bg-white rounded-2xl transition-all active:scale-90 border border-clean-border flex items-center justify-center"
                title="View Design Specs"
              >
                <Figma className="w-6 h-6 text-clean-text-muted" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onOpenMenu(); }}
                className="w-16 h-16 bg-clean-primary text-white rounded-2xl transition-all active:scale-90 shadow-xl shadow-clean-primary/30 flex items-center justify-center"
              >
                <Menu className="w-8 h-8" />
              </button>
            </div>

            {/* Bottom Left: Info Label */}
            <div className="absolute bottom-10 left-10">
              <div className="bg-white/80 backdrop-blur-sm border border-clean-border px-4 py-2 rounded-full shadow-sm">
                <span className="text-[10px] uppercase tracking-widest font-bold text-clean-text-muted">{card.title}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
