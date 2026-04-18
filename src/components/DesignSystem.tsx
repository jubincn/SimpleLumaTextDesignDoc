import { motion } from 'motion/react';
import { Layout, Palette, Type, MousePointer2, Layers, Figma, Plus } from 'lucide-react';

export default function DesignSystem({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full bg-clean-bg flex flex-col font-sans overflow-y-auto pb-20" style={{ paddingTop: 'var(--safe-area-top)', paddingBottom: 'var(--safe-area-bottom)' }}>
      {/* Editorial Header */}
      <div className="px-8 pt-12 pb-8">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-clean-text">Clean Minimalism</h1>
            <p className="text-clean-text-muted max-w-xs">A utility-first design system built for clarity, accessibility, and focus.</p>
          </div>
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white border border-clean-border rounded-xl flex items-center justify-center text-clean-text hover:bg-clean-bg transition-colors shadow-sm"
          >
            <XIcon />
          </button>
        </div>
        <div className="h-1 w-20 bg-clean-primary rounded-full" />
      </div>

      {/* Grid Layout */}
      <div className="px-8 grid grid-cols-1 gap-8">
        {/* Color Palette */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-4 h-4 text-clean-primary" />
            <h2 className="text-[10px] uppercase font-bold tracking-widest text-clean-text-muted">Color Palette</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ColorSwatch color="bg-clean-primary" label="Indigo Primary" hex="#4F46E5" />
            <ColorSwatch color="bg-clean-bg" label="Wash Background" hex="#F9FAFB" />
            <ColorSwatch color="bg-white" label="Surface White" hex="#FFFFFF" border />
            <ColorSwatch color="bg-clean-text" label="Deep Ink" hex="#111827" />
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Type className="w-4 h-4 text-clean-primary" />
            <h2 className="text-[10px] uppercase font-bold tracking-widest text-clean-text-muted">Typography (Inter)</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-clean-border space-y-4">
            <div className="flex items-baseline justify-between py-2 border-b border-clean-border/50">
              <span className="text-[10px] font-bold text-clean-text-light uppercase tracking-widest">Display</span>
              <span className="text-3xl font-black">900 Black</span>
            </div>
            <div className="flex items-baseline justify-between py-2 border-b border-clean-border/50">
              <span className="text-[10px] font-bold text-clean-text-light uppercase tracking-widest">Heading</span>
              <span className="text-xl font-bold">700 Bold</span>
            </div>
            <div className="flex items-baseline justify-between py-2 border-b border-clean-border/50">
              <span className="text-[10px] font-bold text-clean-text-light uppercase tracking-widest">Label</span>
              <span className="text-xs font-bold tracking-widest uppercase">Uppercase</span>
            </div>
            <div className="flex items-baseline justify-between py-2">
              <span className="text-[10px] font-bold text-clean-text-light uppercase tracking-widest">Mono</span>
              <span className="font-mono text-sm">precision_data_1.0</span>
            </div>
          </div>
        </section>

        {/* Components Spec */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
             <Layers className="w-4 h-4 text-clean-primary" />
            <h2 className="text-[10px] uppercase font-bold tracking-widest text-clean-text-muted">Component Specs</h2>
          </div>
          <div className="space-y-4">
            {/* FAB Spec */}
            <div className="bg-white p-6 rounded-2xl border border-clean-border flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-clean-primary text-white rounded-2xl flex items-center justify-center shadow-xl shadow-clean-primary/30">
                <Plus className="w-8 h-8" />
              </div>
              <span className="text-[10px] uppercase font-bold text-clean-text-light">Indigo FAB / 16px Radius</span>
            </div>

            {/* Card Spec */}
            <div className="bg-white p-6 rounded-2xl border border-clean-primary shadow-lg shadow-clean-primary/5 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-clean-primary rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-clean-primary">Active Element</span>
              </div>
              <div className="h-4 w-40 bg-clean-input-bg rounded-full" />
              <div className="h-2 w-20 bg-clean-primary-light rounded-full" />
            </div>
          </div>
        </section>

        {/* Mobile Spec */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <MousePointer2 className="w-4 h-4 text-clean-primary" />
            <h2 className="text-[10px] uppercase font-bold tracking-widest text-clean-text-muted">Mobile Interaction</h2>
          </div>
          <ul className="space-y-3 text-sm font-medium text-clean-text-muted">
             <li className="flex items-center gap-3 bg-white p-4 rounded-xl border border-clean-border">
               <div className="w-2 h-2 bg-green-500 rounded-full" />
               Safe Area Support
             </li>
             <li className="flex items-center gap-3 bg-white p-4 rounded-xl border border-clean-border">
               <div className="w-2 h-2 bg-clean-primary rounded-full" />
               44px Minimum Tap Targets
             </li>
             <li className="flex items-center gap-3 bg-white p-4 rounded-xl border border-clean-border">
               <div className="w-2 h-2 bg-clean-primary rounded-full" />
               Haptic Feedback (10ms)
             </li>
          </ul>
        </section>
      </div>

      {/* Footer Branding */}
      <div className="px-8 mt-12 py-8 border-t border-clean-border flex items-center gap-4 opacity-40">
        <Figma className="w-5 h-5" />
        <span className="text-[10px] uppercase font-bold tracking-widest">Rider Display v2.0 Design Protocol</span>
      </div>
    </div>
  );
}

function ColorSwatch({ color, label, hex, border }: { color: string, label: string, hex: string, border?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`aspect-square rounded-2xl ${color} ${border ? 'border border-clean-border shadow-inner' : ''}`} />
      <div className="px-1">
        <p className="text-[10px] font-bold text-clean-text">{label}</p>
        <p className="text-[10px] text-clean-text-light font-mono">{hex}</p>
      </div>
    </div>
  );
}

function XIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  );
}
