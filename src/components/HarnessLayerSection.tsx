import React, { useState } from 'react';
import { motion } from 'motion/react';

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
  const [activeItem, setActiveItem] = useState<HarnessEntity | null>(null);

  return (
    <section id="section-harness" className="relative w-full min-h-screen py-32 px-6 md:px-12 flex flex-col justify-center border-t border-[#1F2937]/50 bg-[#0A0B0B]">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 relative z-10">
            {HARNESS_ITEMS.map((item) => {
              const isHovered = activeItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveItem(item)}
                  onMouseLeave={() => setActiveItem(null)}
                  className="flex flex-col items-center text-center cursor-pointer group p-3 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isHovered
                          ? 'bg-[#D4AF37] scale-150 shadow-[0_0_10px_rgba(212,175,55,0.9)]'
                          : 'bg-[#4B5563] group-hover:bg-[#9CA3AF]'
                      }`}
                    />
                    <span
                      className={`text-xs md:text-sm font-mono-code tracking-[0.25em] transition-colors duration-300 ${
                        isHovered ? 'text-white font-medium' : 'text-[#8E9299] group-hover:text-[#E5E7EB]'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  <span className="text-[9px] tracking-[0.18em] text-[#6B7280] font-mono-code uppercase">
                    {item.type.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* SVG Fiber Convergence Rail (Desktop) */}
          <div className="relative w-full h-32 md:h-44 hidden md:block">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
              <defs>
                <linearGradient id="fiberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(75, 85, 99, 0.4)" />
                  <stop offset="100%" stopColor="rgba(212, 175, 55, 0.8)" />
                </linearGradient>
                <linearGradient id="activeFiberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(148, 187, 233, 0.9)" />
                  <stop offset="100%" stopColor="rgba(212, 175, 55, 1)" />
                </linearGradient>
              </defs>

              {/* 6 Structural Converging Curves */}
              {[83, 250, 417, 583, 750, 917].map((x, idx) => {
                const item = HARNESS_ITEMS[idx];
                const isActive = activeItem?.id === item.id;
                return (
                  <g key={idx}>
                    <path
                      d={`M ${x} 10 C ${x} 90, 500 110, 500 190`}
                      fill="none"
                      stroke={isActive ? 'url(#activeFiberGrad)' : 'rgba(255,255,255,0.06)'}
                      strokeWidth={isActive ? 1.8 : 0.8}
                      strokeDasharray={isActive ? 'none' : '3,3'}
                      className="transition-all duration-300"
                    />
                    {isActive && (
                      <circle
                        cx="500"
                        cy="190"
                        r="3"
                        fill="#D4AF37"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Converged Center: YU CONTROLLED CONSTRUCTION LAYER */}
          <div className="flex flex-col items-center text-center mt-6 relative z-10">
            {/* Center Anchor Point */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.9)] mb-3" />
            
            <h4 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.25em] text-white pl-[0.25em] mb-2">
              YU
            </h4>
            
            <div className="text-[10px] sm:text-xs tracking-[0.4em] text-[#8E9299] font-mono-code uppercase pl-[0.4em]">
              CONTROLLED CONSTRUCTION LAYER
            </div>

            {/* Dynamic Governance Inspector Badge */}
            <div className="mt-8 min-h-[72px] max-w-xl px-6 py-3 border border-[#1F2937] bg-[#0E1012] rounded-xs flex flex-col items-center justify-center text-center transition-all duration-300">
              {activeItem ? (
                <div className="space-y-1">
                  <div className="text-xs font-mono-code text-[#D4AF37] tracking-wider">
                    [HARNESS CONSTRAINT] {activeItem.name} — {activeItem.type}
                  </div>
                  <p className="text-xs text-[#D1D5DB] font-light">
                    {activeItem.governanceContract}
                  </p>
                </div>
              ) : (
                <p className="text-xs font-mono-code text-[#6B7280] tracking-wider">
                  Hover over capabilities to inspect YU determinism envelopes & state isolation.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
