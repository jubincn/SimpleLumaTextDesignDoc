/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InfoCard, ViewState } from './types';
import MainDisplay from './components/MainDisplay';
import CardManager from './components/CardManager';
import CardEditor from './components/CardEditor';
import DesignSystem from './components/DesignSystem';

const STORAGE_KEY = 'rider_info_cards';
const ACTIVE_CARD_KEY = 'rider_active_card_id';

const INITIAL_CARDS: InfoCard[] = [
  {
    id: '1',
    title: 'Mobile Number',
    content: '8765 4321',
    enableReadAloud: true,
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'Order ID',
    content: '#FJ-1982',
    enableReadAloud: true,
    createdAt: Date.now() - 1000
  }
];

export default function App() {
  const [cards, setCards] = useState<InfoCard[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_CARDS;
  });
  
  const [activeCardId, setActiveCardId] = useState<string | null>(() => {
    return localStorage.getItem(ACTIVE_CARD_KEY) || (INITIAL_CARDS[0]?.id || null);
  });

  const [view, setView] = useState<ViewState>('display');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    if (activeCardId) {
      localStorage.setItem(ACTIVE_CARD_KEY, activeCardId);
    }
  }, [activeCardId]);

  const activeCard = cards.find(c => c.id === activeCardId) || null;

  const handleAddCard = (data: Omit<InfoCard, 'id' | 'createdAt'>) => {
    const newCard: InfoCard = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now()
    };
    setCards(prev => [newCard, ...prev]);
    setActiveCardId(newCard.id);
    setView('display');
  };

  const handleUpdateCard = (data: Omit<InfoCard, 'id' | 'createdAt'>) => {
    if (!editingCardId) return;
    setCards(prev => prev.map(c => c.id === editingCardId ? { ...c, ...data } : c));
    setEditingCardId(null);
    setView('manage');
  };

  const handleDeleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
    if (activeCardId === id) {
      setActiveCardId(cards.find(c => c.id !== id)?.id || null);
    }
  };

  const handleStartEdit = (id: string) => {
    setEditingCardId(id);
    setView('edit');
  };

  return (
    <div className="w-full h-full bg-clean-bg overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {view === 'display' && (
          <motion.div 
            key="display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full"
          >
            <MainDisplay 
              card={activeCard} 
              onOpenMenu={() => setView('manage')}
              onOpenDesignSystem={() => setView('figma')}
            />
          </motion.div>
        )}

        {view === 'manage' && (
          <motion.div 
            key="manage"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full h-full"
          >
            <CardManager 
              cards={cards}
              activeCardId={activeCardId}
              onSelect={(id) => { setActiveCardId(id); setView('display'); }}
              onDelete={handleDeleteCard}
              onEdit={handleStartEdit}
              onAdd={() => { setEditingCardId(null); setView('edit'); }}
              onBack={() => setView('display')}
            />
          </motion.div>
        )}

        {view === 'edit' && (
          <motion.div 
            key="edit"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full h-full"
          >
            <CardEditor 
              card={cards.find(c => c.id === editingCardId)}
              onSave={editingCardId ? handleUpdateCard : handleAddCard}
              onCancel={() => { setEditingCardId(null); setView('manage'); }}
            />
          </motion.div>
        )}

        {view === 'figma' && (
          <motion.div 
            key="figma"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full h-full"
          >
            <DesignSystem onBack={() => setView('display')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

