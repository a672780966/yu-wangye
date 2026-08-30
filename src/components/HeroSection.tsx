import React from 'react';
import { motion } from 'motion/react';
import { MöbiusCanvas } from './MöbiusCanvas';

interface HeroSectionProps {
  onScrollClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollClick }) => {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Parametric Infinity Mesh Canvas */}
      <div className="absolute inset-0 z-0 opacity-80">
        <MöbiusCanvas />
      </div>

      {/* Sleek Interface space gradient overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-radial from-transparent via-[#0A0B0B]/40 to-[#0A0B0B]" />

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto my-auto select-none">
        {/* Sleek Interface Axis Telemetry Coordinates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex items-center gap-4 text-[9px] font-mono-code text-[#6B7280] tracking-[0.3em] uppercase mb-8"
        >
          <span>AXIS 001</span>
          <span className="w-1 h-1 rounded-full bg-[#374151]" />
          <span>GOVERNED STATE ENGINE</span>
        </motion.div>

        {/* Brand Core Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-light tracking-[0.25em] text-white pl-[0.25em] leading-none mb-4 md:mb-6 drop-shadow-[0_0_40px_rgba(255,255,255,0.12)]">
            YU
          </h1>
        </motion.div>

        {/* Brand Promise Dual Lines in Sleek Interface Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 mb-8 md:mb-10"
        >
          <h2 className="text-base sm:text-lg md:text-2xl font-light tracking-[0.4em] text-[#E5E7EB] pl-[0.4em]">
            HARNESS INTELLIGENCE.
          </h2>
          <h2 className="text-base sm:text-lg md:text-2xl font-light tracking-[0.4em] text-[#9CA3AF] pl-[0.4em]">
            RETAIN CONTROL.
          </h2>
        </motion.div>

        {/* Fine Separator Line with Centered Anchor Dot */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="relative w-48 sm:w-64 md:w-80 h-[1px] bg-gradient-to-r from-transparent via-[#4B5563] to-transparent my-6 flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
        </motion.div>

        {/* Sub-line: BUILD · GOVERN · VERIFY · EVOLVE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="text-xs sm:text-sm tracking-[0.45em] text-[#D1D5DB] font-mono-code mb-4 pl-[0.45em]"
        >
          BUILD · GOVERN · VERIFY · EVOLVE
        </motion.div>

        {/* Small Category Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
          className="text-[10px] sm:text-xs tracking-[0.32em] text-[#6B7280] font-mono-code uppercase max-w-xl pl-[0.32em]"
        >
          LOCAL-FIRST CONTROLLED AGENTIC SOFTWARE CONSTRUCTION
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 mt-auto flex flex-col items-center cursor-pointer group"
        onClick={onScrollClick}
      >
        <span className="text-[9px] tracking-[0.4em] text-[#6B7280] font-mono-code group-hover:text-white transition-colors pl-[0.4em] mb-3">
          SCROLL
        </span>
        <div className="relative w-[1px] h-10 bg-gradient-to-b from-[#4B5563] via-[#374151] to-transparent flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.9)]"
          />
        </div>
      </motion.div>
    </section>
  );
};

