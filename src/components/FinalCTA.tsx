import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Terminal, Shield } from 'lucide-react';

interface FinalCTAProps {
  onEnterClick: () => void;
  onExploreClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onEnterClick, onExploreClick }) => {
  return (
    <section className="relative w-full py-36 px-6 md:px-16 flex flex-col items-center justify-center border-t border-[#1F2937]/50 bg-[#0A0B0B] overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-full h-full sleek-grid-bg" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
        {/* Brand Core Title Recirculation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mb-4 shadow-[0_0_12px_rgba(212,175,55,0.9)]" />
          <h1 className="font-display text-7xl sm:text-8xl md:text-9xl font-light tracking-[0.22em] text-white pl-[0.22em] leading-none mb-6">
            YU
          </h1>
        </motion.div>

        {/* Core Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="space-y-1.5 mb-8"
        >
          <h2 className="text-sm sm:text-base md:text-xl font-light tracking-[0.35em] text-[#E5E7EB] pl-[0.35em]">
            HARNESS INTELLIGENCE.
          </h2>
          <h2 className="text-sm sm:text-base md:text-xl font-light tracking-[0.35em] text-[#8E9299] pl-[0.35em]">
            RETAIN CONTROL.
          </h2>
        </motion.div>

        {/* Fine Sub-Line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-xs tracking-[0.45em] text-[#8E9299] font-mono-code mb-12 pl-[0.45em]"
        >
          BUILD · GOVERN · VERIFY · EVOLVE
        </motion.div>

        {/* Exactly Two Restrained Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-24"
        >
          {/* Primary CTA: ENTER YU */}
          <button
            id="cta-enter-yu-btn"
            onClick={onEnterClick}
            className="flex items-center gap-3 px-8 py-3.5 border border-[#374151] bg-[#121418] hover:bg-[#1C2026] hover:border-[#4B5563] text-xs sm:text-sm tracking-[0.25em] text-white font-mono-code rounded-xs transition-all duration-300 shadow-xl group"
          >
            <span>ENTER YU</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.9)] group-hover:scale-125 transition-transform" />
          </button>

          {/* Secondary Low-Tier CTA: EXPLORE THE SYSTEM */}
          <button
            id="cta-explore-system-btn"
            onClick={onExploreClick}
            className="flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm tracking-[0.25em] text-[#8E9299] hover:text-white font-mono-code transition-colors duration-300"
          >
            <span>EXPLORE THE SYSTEM</span>
            <ArrowUpRight className="w-4 h-4 text-[#6B7280]" />
          </button>
        </motion.div>

        {/* Restrained Machine Footer */}
        <div className="w-full pt-12 border-t border-[#1F2937] flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] md:text-[11px] font-mono-code text-[#6B7280]">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[#8E9299]">SYSTEM STATE: DETERMINISTIC STABLE</span>
          </div>

          <div className="text-[#6B7280]">
            LOCAL-FIRST CONTROLLED AGENTIC SOFTWARE CONSTRUCTION
          </div>

          <div className="text-[#6B7280]">
            © 2026 YU · ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </section>
  );
};
