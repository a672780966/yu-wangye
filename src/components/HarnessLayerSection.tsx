import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HarnessEntity {
  id: string;
  name: string;
  type: string;
  description: string;
  governanceContract: string;
}

const HARNESS_ITEMS: HarnessEntity[] = [
  {
    id: 'models',
    name: 'MODELS',
    type: 'PROBABILISTIC REASONING',
    description: 'Foundation intelligence engine (Claude, GPT, Gemini, Llama, local weights).',
    governanceContract: 'Confined to node-specific context; prohibited from self-authorizing state changes.',
  },
  {
    id: 'agents',
    name: 'AGENTS',
    type: 'GOAL-DIRECTED EXECUTION',
    description: 'Autonomous worker loops solving sub-tasks within a single node envelope.',
    governanceContract: 'Execution bounded by explicit entry criteria, file access masks, and token ceilings.',
  },
  {
    id: 'skills',
    name: 'SKILLS',
    type: 'PROCEDURAL KNOWLEDGE',
    description: 'Domain-specific instructions, architectural playbooks, and design constraints.',
    governanceContract: 'Injected only when required by node scope to prevent prompt pollution and drift.',
  },
  {
    id: 'mcp',
    name: 'MCP',
    type: 'MODEL CONTEXT PROTOCOL',
    description: 'Standardized context servers connecting local databases, browsers, and docs.',
    governanceContract: 'Read-only or sandboxed write operations verified via cryptographic session hashes.',
  },
  {
    id: 'tools',
    name: 'TOOLS',
    type: 'DETERMINISTIC COMPILERS',
    description: 'CLI runners, linters, TypeScript compilers, test suites, and AST transformers.',
    governanceContract: 'Invoked under deterministic environmental isolation with real stdout/stderr capture.',
  },
  {
    id: 'runtime',
    name: 'RUNTIME',
    type: 'EXECUTION ENVIRONMENT',
    description: 'Node.js, Docker, browser virtual DOM, and local operating system containers.',
    governanceContract: 'Monitored for side-effects, port bindings, leakages, and deterministic replay.',
  },
];

export const HarnessLayerSection: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<HarnessEntity | null>(null);
  const [lockedItem, setLockedItem] = useState<HarnessEntity | null>(null);

  const activeItem = lockedItem || hoveredItem;

  const handleItemClick = (item: HarnessEntity) => {
    if (lockedItem?.id === item.id) {
      setLockedItem(null);
    } else {
      setLockedItem(item);
    }
  };

  return (
    <section
      id="section-harness"
      onClick={(e) => {
        // Clicking outside interactive elements unlocks
        if ((e.target as HTMLElement).closest('[data-harness-item]')) return;
        setLockedItem(null);
      }}
      className="relative w-full min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center border-t border-[#1F2937]/50 bg-[#0A0B0B]"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 text-xs tracking-[0.35em] text-[#8E9299] font-mono-code mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
          <span>03 / HARNESS LAYER</span>
        </motion.div>

        {/* Narrative Headline */}
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-light tracking-[0.14em] text-[#F3F4F6] uppercase mb-4">
            USE THE INTELLIGENCE YOU CHOOSE.
          </h3>
          <p className="text-sm md:text-base text-[#8E9299] font-light leading-relaxed">
            模型可以自由选择。<br className="hidden sm:inline" />
            项目的范围、依赖、证据、验收与状态不能自由漂移。
          </p>
        </div>

        {/* Interactive Mechanical Harness Matrix & Converging Lines */}
        <div className="relative py-8">
          {/* Top Capability Anchors */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 relative z-10">
            {HARNESS_ITEMS.map((item) => {
              const isSelected = activeItem?.id === item.id;
              const isLocked = lockedItem?.id === item.id;
              const isDimmed = activeItem && !isSelected;

              return (
                <button
                  key={item.id}
                  data-harness-item="true"
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex flex-col items-center text-center cursor-pointer p-3 border rounded-xs mech-btn transition-all duration-200 ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#14171E] shadow-[0_0_15px_rgba(212,175,55,0.12)]'
                      : isDimmed
                      ? 'border-[#1F2937]/50 bg-[#08090A] opacity-40 hover:opacity-80'
                      : 'border-[#1F2937] bg-[#0E1012] hover:border-[#4B5563] hover:bg-[#121418]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 mech-dot ${
                        isSelected
                          ? 'bg-[#D4AF37] scale-125 shadow-[0_0_8px_rgba(212,175,55,0.9)]'
                          : 'bg-[#4B5563]'
                      }`}
                    />
                    <span
                      className={`text-xs md:text-sm font-mono-code tracking-[0.25em] transition-colors ${
                        isSelected ? 'text-white font-medium' : 'text-[#8E9299]'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] tracking-[0.16em] text-[#6B7280] font-mono-code uppercase">
                      {item.type.split(' ')[0]}
                    </span>
                    {isLocked && (
                      <span className="w-1 h-1 rounded-full bg-[#D4AF37]" title="Focus Locked" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* SVG Fiber Convergence Rail (Desktop Signal Routing) */}
          <div className="relative w-full h-32 md:h-44 hidden md:block">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
              <defs>
                <linearGradient id="activeFiberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(148, 187, 201, 1)" />
                  <stop offset="100%" stopColor="rgba(212, 175, 55, 1)" />
                </linearGradient>
              </defs>

              {/* 6 Structural Converging Curves with Traveling Signal */}
              {[83, 250, 417, 583, 750, 917].map((x, idx) => {
                const item = HARNESS_ITEMS[idx];
                const isSelected = activeItem?.id === item.id;
                const isDimmed = activeItem && !isSelected;

                return (
                  <g key={idx}>
                    {/* Base structural curve */}
                    <path
                      d={`M ${x} 10 C ${x} 90, 500 110, 500 190`}
                      fill="none"
                      stroke={
                        isSelected
                          ? 'url(#activeFiberGrad)'
                          : isDimmed
                          ? 'rgba(255,255,255,0.03)'
                          : 'rgba(255,255,255,0.08)'
                      }
                      strokeWidth={isSelected ? 1.8 : 0.75}
                      strokeDasharray={isSelected ? 'none' : '3,3'}
                      className="transition-all duration-300"
                    />

                    {/* Traveling Signal Pulse (300-450ms) */}
                    {isSelected && (
                      <motion.circle
                        r="3.5"
                        fill="#D4AF37"
                        filter="drop-shadow(0 0 6px #D4AF37)"
                      >
                        <animateMotion
                          path={`M ${x} 10 C ${x} 90, 500 110, 500 190`}
                          dur="0.4s"
                          repeatCount="indefinite"
                        />
                      </motion.circle>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Converged Center: YU CONTROLLED CONSTRUCTION LAYER */}
          <div className="flex flex-col items-center text-center mt-6 relative z-10">
            {/* Center Anchor Point */}
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 mb-3 ${
                activeItem
                  ? 'bg-[#D4AF37] scale-125 shadow-[0_0_14px_rgba(212,175,55,1)]'
                  : 'bg-[#4B5563]'
              }`}
            />
            
            <h4 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.25em] text-white pl-[0.25em] mb-2">
              YU
            </h4>
            
            <div className="text-[10px] sm:text-xs tracking-[0.4em] text-[#8E9299] font-mono-code uppercase pl-[0.4em]">
              CONTROLLED CONSTRUCTION LAYER
            </div>

            {/* Dynamic Governance Inspector Badge */}
            <div
              data-harness-item="true"
              className="mt-8 min-h-[76px] max-w-xl w-full px-6 py-4 border border-[#1F2937] bg-[#0E1012] rounded-xs flex flex-col items-center justify-center text-center transition-all duration-200 shadow-lg"
            >
              <AnimatePresence mode="wait">
                {activeItem ? (
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-1.5"
                  >
                    <div className="flex items-center justify-center gap-2 text-xs font-mono-code text-[#D4AF37] tracking-wider">
                      <span>[HARNESS CONTRACT]</span>
                      <span className="text-white font-medium">{activeItem.name}</span>
                      <span className="text-[#6B7280]">·</span>
                      <span className="text-[#94BBC9] text-[11px]">{activeItem.type}</span>
                      {lockedItem?.id === activeItem.id && (
                        <span className="text-[9px] px-1.5 py-0.2 border border-[#D4AF37]/50 text-[#D4AF37] ml-1">LOCKED</span>
                      )}
                    </div>
                    <p className="text-xs text-[#D1D5DB] font-light leading-relaxed">
                      {activeItem.governanceContract}
                    </p>
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-mono-code text-[#6B7280] tracking-wider"
                  >
                    Hover to preview signal routing · Click to lock capability focus
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

