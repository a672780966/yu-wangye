import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export interface SpineSection {
  id: string;
  number: string;
  name: string;
}

export const SPINE_SECTIONS: SpineSection[] = [
  { id: 'section-hero', number: '01', name: 'HERO' },
  { id: 'section-problem', number: '02', name: 'PROBLEM' },
  { id: 'section-harness', number: '03', name: 'HARNESS' },
  { id: 'section-rail', number: '04', name: 'CONSTRUCTION' },
  { id: 'section-control', number: '05', name: 'CONTROL' },
  { id: 'section-node', number: '06', name: 'NODE' },
  { id: 'section-workbench', number: '07', name: 'WORKBENCH' },
  { id: 'section-intelligence', number: '08', name: 'INTELLIGENCE' },
  { id: 'section-architecture', number: '09', name: 'SOVEREIGNTY' },
  { id: 'section-promise', number: '10', name: 'PROMISE' },
  { id: 'section-cta', number: '11', name: 'RELEASE' },
];

interface SystemSpineProps {
  activeSectionId: string;
  onSectionClick: (id: string) => void;
}

export const SystemSpine: React.FC<SystemSpineProps> = ({
  activeSectionId,
  onSectionClick,
}) => {
  const activeIndex = SPINE_SECTIONS.findIndex((s) => s.id === activeSectionId);
  const currentSection = SPINE_SECTIONS[activeIndex >= 0 ? activeIndex : 0];

  return (
    <aside
      aria-label="System Structural Spine"
      className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center z-30 select-none pointer-events-auto"
    >
      {/* Top Anchor Marker */}
      <div className="w-1.5 h-1.5 rounded-full border border-[#4B5563] bg-[#0A0B0B] mb-2" />

      {/* The 1px System Spine Track with Section Notches */}
      <div className="relative w-[1px] h-64 md:h-80 bg-[#1F2937]/70 flex flex-col justify-between items-center">
        {/* Continuous Active Trail Line */}
        <div
          className="absolute top-0 w-[1px] bg-gradient-to-b from-[#D4AF37]/80 to-[#94BBC9] transition-all duration-300 ease-out"
          style={{
            height: `${((activeIndex >= 0 ? activeIndex : 0) / (SPINE_SECTIONS.length - 1)) * 100}%`,
          }}
        />

        {/* Section Notches */}
        {SPINE_SECTIONS.map((sec, idx) => {
          const isActive = sec.id === activeSectionId;
          const isPassed = idx < activeIndex;

          return (
            <button
              key={sec.id}
              onClick={() => onSectionClick(sec.id)}
              title={`${sec.number} / ${sec.name}`}
              className="relative -left-[3.5px] w-2 h-2 flex items-center justify-center group cursor-pointer mech-btn"
            >
              <span
                className={`w-1 h-1 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'w-2 h-2 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.9)]'
                    : isPassed
                    ? 'bg-[#9CA3AF]'
                    : 'bg-[#374151] group-hover:bg-[#6B7280]'
                }`}
              />

              {/* Hover Tooltip on Spine Notch */}
              <span className="absolute left-4 px-2 py-0.5 bg-[#0E1012] border border-[#1F2937] text-[9px] font-mono-code text-[#D1D5DB] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xs">
                {sec.number} / {sec.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Anchor Marker */}
      <div className="w-1.5 h-1.5 rounded-full border border-[#4B5563] bg-[#0A0B0B] mt-2" />

      {/* Active Section Label Beside Spine (Quiet Indicator) */}
      <div className="mt-4 flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
        <span className="text-[9px] tracking-[0.25em] text-[#8E9299] font-mono-code whitespace-nowrap">
          {currentSection.number} / {currentSection.name}
        </span>
      </div>
    </aside>
  );
};
