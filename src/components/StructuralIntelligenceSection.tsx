import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectionType } from '../types';
import { Network, GitFork, Boxes, Compass } from 'lucide-react';

export const StructuralIntelligenceSection: React.FC = () => {
  const [projection, setProjection] = useState<ProjectionType>('CONSTRUCTION');

  return (
    <section id="section-intelligence" className="relative w-full min-h-screen py-32 px-6 md:px-16 flex flex-col justify-center border-t border-[#1F2937]/50 bg-[#0A0B0B]">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Identifier */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 text-xs tracking-[0.35em] text-[#8E9299] font-mono-code mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
          <span>08 / STRUCTURAL INTELLIGENCE</span>
        </motion.div>

        {/* Narrative Headline */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light tracking-[0.14em] text-white uppercase mb-2">
            DIFFERENT QUESTIONS.
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light tracking-[0.14em] text-[#D1D5DB] uppercase mb-2">
            DIFFERENT PROJECTIONS.
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light tracking-[0.14em] text-[#D4AF37] uppercase mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            ONE PROJECT.
          </h2>
          <p className="text-sm md:text-base text-[#8E9299] font-light max-w-2xl leading-relaxed">
            计划关系、施工关系和真实代码结构不是同一张图。<br className="hidden sm:inline" />
            YU 不把它们混成一个漂亮但失真的网络。
          </p>
        </div>

        {/* Projection Switcher Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
          {[
            { id: 'PLANNING', label: '01. PLANNING PROJECTION', desc: 'Intent, spec milestones & business acceptance' },
            { id: 'CONSTRUCTION', label: '02. CONSTRUCTION PROJECTION', desc: 'Active node DAG, gates, evidence & audit states' },
            { id: 'IMPLEMENTATION', label: '03. IMPLEMENTATION PROJECTION', desc: 'AST imports, file tree, dependencies & runtime' },
          ].map((tab) => {
            const isSelected = projection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setProjection(tab.id as ProjectionType)}
                className={`px-4 py-2.5 text-left border rounded-xs font-mono-code transition-all duration-200 ${
                  isSelected
                    ? 'border-[#D4AF37]/80 bg-[#161920] shadow-[0_0_15px_rgba(212,175,55,0.12)]'
                    : 'border-[#1F2937] bg-[#0A0C0E] hover:border-[#374151]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#D4AF37]' : 'bg-[#4B5563]'}`} />
                  <span className={`text-xs tracking-wider ${isSelected ? 'text-white font-medium' : 'text-[#8E9299]'}`}>
                    {tab.label}
                  </span>
                </div>
                <div className="text-[10px] text-[#6B7280] font-light mt-0.5 hidden sm:block">
                  {tab.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Projection Canvas Graphic Display */}
        <div className="relative border border-[#1F2937] bg-[#0E1012] p-6 md:p-10 rounded-xs min-h-[380px] flex flex-col justify-center overflow-hidden shadow-2xl">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="w-full h-full sleek-grid-bg" />
          </div>

          <AnimatePresence mode="wait">
            {projection === 'PLANNING' && (
              <motion.div
                key="planning"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 space-y-6"
              >
                <div className="flex items-center justify-between text-xs font-mono-code text-[#8E9299] border-b border-[#1F2937] pb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#94BBC9]" />
                    <span>LENS: INTENT & FUNCTIONAL ACCEPTANCE TOPOLOGY</span>
                  </div>
                  <span className="text-[#6B7280]">3 MILESTONES · 14 ACCEPTANCE CONTRACTS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-code text-xs">
                  <div className="p-4 border border-[#1F2937] bg-[#060708] space-y-2 rounded-xs">
                    <div className="text-[#D4AF37] font-medium">MILESTONE 01: CORE AUTH CONTRACT</div>
                    <p className="text-[#8E9299] text-[11px] font-sans">Multi-tenant session isolation and JWT rotation contract.</p>
                    <div className="text-emerald-400 text-[10px]">✓ SPECIFICATION SEALED</div>
                  </div>
                  <div className="p-4 border border-[#1F2937] bg-[#060708] space-y-2 rounded-xs">
                    <div className="text-[#94BBC9] font-medium">MILESTONE 02: PERSISTENCE ENGINE</div>
                    <p className="text-[#8E9299] text-[11px] font-sans">Durable storage schemas, rollback transactions, and indexing.</p>
                    <div className="text-emerald-400 text-[10px]">✓ SPECIFICATION SEALED</div>
                  </div>
                  <div className="p-4 border border-[#1F2937] bg-[#060708] space-y-2 rounded-xs">
                    <div className="text-[#D1D5DB] font-medium">MILESTONE 03: VERIFIED RELEASE GATE</div>
                    <p className="text-[#8E9299] text-[11px] font-sans">End-to-end audit pass and container packaging validation.</p>
                    <div className="text-[#D4AF37] text-[10px]">● PENDING EXECUTION EVIDENCE</div>
                  </div>
                </div>
              </motion.div>
            )}

            {projection === 'CONSTRUCTION' && (
              <motion.div
                key="construction"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 space-y-6"
              >
                <div className="flex items-center justify-between text-xs font-mono-code text-[#8E9299] border-b border-[#1F2937] pb-3">
                  <div className="flex items-center gap-2">
                    <GitFork className="w-4 h-4 text-[#D4AF37]" />
                    <span>LENS: ACTIVE CONSTRUCTION DAG & INDEPENDENT AUDIT NODES</span>
                  </div>
                  <span className="text-[#6B7280]">12 NODES ACTIVE · 18 GATES VERIFIED</span>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono-code text-xs">
                  <div className="w-full p-3.5 border border-[#1F2937] bg-[#060708] space-y-1 rounded-xs">
                    <div className="text-[#6B7280] text-[10px]">NODE-01: SCHEMA</div>
                    <div className="text-[#D1D5DB] font-medium">drizzle_models.ts</div>
                    <div className="text-emerald-400 text-[10px]">✓ AUDIT PASS</div>
                  </div>

                  <div className="text-[#4B5563] font-bold hidden md:block">→</div>

                  <div className="w-full p-3.5 border border-[#D4AF37]/50 bg-[#161920] space-y-1 shadow-[0_0_12px_rgba(212,175,55,0.1)] rounded-xs">
                    <div className="text-[#D4AF37] text-[10px]">NODE-02: AUTH_SERVICE (ACTIVE)</div>
                    <div className="text-white font-medium">token_lifecycle.ts</div>
                    <div className="text-[#94BBC9] text-[10px]">● EVALUATING AUDIT GATE</div>
                  </div>

                  <div className="text-[#4B5563] font-bold hidden md:block">→</div>

                  <div className="w-full p-3.5 border border-[#1F2937] bg-[#060708] space-y-1 rounded-xs">
                    <div className="text-[#6B7280] text-[10px]">NODE-03: API_ROUTER</div>
                    <div className="text-[#8E9299] font-medium">auth_routes.ts</div>
                    <div className="text-[#6B7280] text-[10px]">BLOCKED BY NODE-02</div>
                  </div>
                </div>
              </motion.div>
            )}

            {projection === 'IMPLEMENTATION' && (
              <motion.div
                key="implementation"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 space-y-6"
              >
                <div className="flex items-center justify-between text-xs font-mono-code text-[#8E9299] border-b border-[#1F2937] pb-3">
                  <div className="flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-emerald-400" />
                    <span>LENS: AST IMPORT TOPOLOGY & BUNDLE COMPILATION GRAPH</span>
                  </div>
                  <span className="text-[#6B7280]">24 MODULES · ZERO CIRCULAR IMPORTS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono-code text-xs">
                  <div className="p-4 border border-[#1F2937] bg-[#060708] space-y-1.5 rounded-xs">
                    <div className="text-emerald-400 font-medium">MODULE DEPENDENCY INTEGRITY</div>
                    <p className="text-[#8E9299] text-[11px] font-sans">
                      All relative ES module imports cleanly verified. No unresolvable cyclic references in dependency graph.
                    </p>
                  </div>
                  <div className="p-4 border border-[#1F2937] bg-[#060708] space-y-1.5 rounded-xs">
                    <div className="text-[#94BBC9] font-medium">PACKAGE & LOCKFILE PURITY</div>
                    <p className="text-[#8E9299] text-[11px] font-sans">
                      Zero unpinned transitive dependencies. Exact SHA-256 package digests verified against local lockfile.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
