import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { SPINE_SECTIONS } from './SystemSpine';
import { scrollController } from '../lib/scrollController';

interface HeaderProps {
  onEnterClick: () => void;
  activeSectionId?: string;
}

export const Header: React.FC<HeaderProps> = ({ onEnterClick, activeSectionId = 'section-hero' }) => {
  const [activeModal, setActiveModal] = useState<'MANIFESTO' | 'SYSTEM' | 'RESEARCH' | null>(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentSec = SPINE_SECTIONS.find((s) => s.id === activeSectionId) || SPINE_SECTIONS[0];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 flex items-center justify-between pointer-events-auto transition-all duration-300 ${
          isCompact
            ? 'py-4 bg-[#0A0B0B]/80 backdrop-blur-md border-b border-[#1F2937]/40 shadow-lg'
            : 'py-8 bg-transparent border-b border-transparent'
        }`}
      >
        {/* Left Navigation in Sleek Interface Design */}
        <nav className="flex items-center gap-6 sm:gap-10 text-[10px] sm:text-[11px] tracking-[0.25em] font-medium text-[#8E9299] font-sans">
          <button
            id="nav-manifesto-btn"
            onClick={() => setActiveModal('MANIFESTO')}
            className="hover:text-white cursor-pointer transition-colors uppercase tracking-[0.25em] mech-btn py-1"
          >
            MANIFESTO
          </button>

          <button
            id="nav-system-btn"
            onClick={() => setActiveModal('SYSTEM')}
            className="hover:text-white cursor-pointer transition-colors uppercase tracking-[0.25em] mech-btn py-1"
          >
            SYSTEM
          </button>

          <button
            id="nav-research-btn"
            onClick={() => setActiveModal('RESEARCH')}
            className="hover:text-white cursor-pointer transition-colors uppercase tracking-[0.25em] mech-btn py-1"
          >
            RESEARCH
          </button>
        </nav>

        {/* Center YU Brand Mark */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto">
          <a
            href="#"
            className="group flex flex-col items-center text-center cursor-pointer select-none mech-btn"
            onClick={(e) => {
              e.preventDefault();
              scrollController.scrollTo(0);
            }}
          >
            <span
              className={`font-extralight tracking-[0.4em] text-white opacity-95 pl-[0.4em] transition-all duration-300 ${
                isCompact ? 'text-[16px] md:text-[18px]' : 'text-[18px] md:text-[20px]'
              }`}
            >
              YU
            </span>
          </a>
        </div>

        {/* Right Section Telemetry Indicator & Enter Button */}
        <div className="flex items-center gap-6 text-[10px] sm:text-[11px] tracking-[0.25em] font-medium font-mono-code">
          {/* Section telemetry (Desktop only, connects header to system spine) */}
          <div className="hidden xl:flex items-center gap-2 text-[9px] text-[#6B7280]">
            <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
            <span>{currentSec.number} / {currentSec.name}</span>
          </div>

          <button
            id="header-enter-btn"
            onClick={onEnterClick}
            className="flex items-center gap-3 text-white hover:text-[#F3F4F6] transition-colors cursor-pointer group py-1 mech-btn"
          >
            <span className="tracking-[0.25em]">ENTER</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#E5E7EB] shadow-[0_0_8px_rgba(255,255,255,0.4)] group-hover:scale-125 transition-transform mech-dot" />
          </button>
        </div>
      </header>

      {/* Drawer / Modals for Manifesto, System, Research */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0A0B0B] border border-[#1F2937] p-8 md:p-12 text-[#D1D5DB] shadow-2xl rounded-xs"
            >
              {/* Close Button */}
              <button
                id="modal-close-btn"
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 text-[#8E9299] hover:text-white border border-[#1F2937] hover:border-[#4B5563] transition-colors mech-btn"
              >
                <X className="w-4 h-4" />
              </button>

              {/* MANIFESTO CONTENT */}
              {activeModal === 'MANIFESTO' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] font-mono-code text-[#8E9299]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>YU MANIFESTO · 01</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-light tracking-[0.14em] text-white font-display">
                    THE CONTROLLED CONSTRUCTION IMPERATIVE
                  </h2>

                  <div className="h-[1px] w-full bg-[#1F2937]" />

                  <div className="space-y-4 text-sm md:text-base leading-relaxed text-[#D1D5DB] font-light">
                    <p className="text-white font-normal">
                      The era of probabilistic generation without deterministic construction is coming to an end.
                    </p>
                    <p>
                      Today, large models can generate hundreds of lines of code in seconds. They can build prototypes,
                      solve isolated puzzles, and construct convincing demonstrations. But a demonstration is not a production system.
                    </p>
                    <blockquote className="pl-4 border-l border-[#D4AF37] text-[#F3F4F6] italic my-4">
                      “A demo can run, can render, can look complete. But configuration boundaries, state durability, regression baselines, independent verification, and packaging readiness remain unverified.”
                    </blockquote>
                    <p>
                      YU exists to bridge the fatal chasm between <em>“It runs once”</em> and <em>“It is verified for release.”</em>
                    </p>
                    <p>
                      By wrapping agent execution in structured, immutable <strong>Controlled Nodes</strong>, <strong>Independent Audit Gates</strong>, and <strong>Deterministic Evidence Chains</strong>, YU ensures that human intent transforms into auditable software fact—without losing sovereign control.
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#1F2937] text-xs font-mono-code text-[#8E9299]">
                    <span>HARNESS INTELLIGENCE. RETAIN CONTROL.</span>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="text-[#D1D5DB] hover:text-white underline underline-offset-4 mech-btn"
                    >
                      RETURN TO SYSTEM
                    </button>
                  </div>
                </div>
              )}

              {/* SYSTEM CONTENT */}
              {activeModal === 'SYSTEM' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] font-mono-code text-[#8E9299]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#94BBC9]" />
                    <span>YU SYSTEM SPECIFICATION · ARCHITECTURE</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-light tracking-[0.14em] text-white font-display">
                    LOCAL-FIRST WORKBENCH ARCHITECTURE
                  </h2>

                  <div className="h-[1px] w-full bg-[#1F2937]" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono-code">
                    <div className="p-4 border border-[#1F2937] bg-[#0E1012]">
                      <div className="text-[#D4AF37] font-semibold mb-1">01. LOCAL-FIRST SOVEREIGNTY</div>
                      <p className="text-[#8E9299] leading-relaxed font-sans text-xs">
                        All project files, AST trees, git references, and evidence ledgers reside entirely on your machine.
                      </p>
                    </div>

                    <div className="p-4 border border-[#1F2937] bg-[#0E1012]">
                      <div className="text-[#94BBC9] font-semibold mb-1">02. NODE ISOLATION ENVELOPE</div>
                      <p className="text-[#8E9299] leading-relaxed font-sans text-xs">
                        Each node is injected strictly with scoped context, authorized tools (MCP), and explicit output contracts.
                      </p>
                    </div>

                    <div className="p-4 border border-[#1F2937] bg-[#0E1012]">
                      <div className="text-[#E5E7EB] font-semibold mb-1">03. INDEPENDENT AUDIT SEPARATION</div>
                      <p className="text-[#8E9299] leading-relaxed font-sans text-xs">
                        The executor model is barred from auditing its own code. Verification is executed by independent rules & audit nodes.
                      </p>
                    </div>

                    <div className="p-4 border border-[#1F2937] bg-[#0E1012]">
                      <div className="text-[#34D399] font-semibold mb-1">04. FORMAL RELEASE READINESS</div>
                      <p className="text-[#8E9299] leading-relaxed font-sans text-xs">
                        Release readiness is computed mathematically through 100% satisfied gates—never by statistical guessing.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#1F2937] text-xs font-mono-code text-[#8E9299]">
                    <span>STATUS: SPECIFICATION ACTIVE</span>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="text-[#D1D5DB] hover:text-white underline underline-offset-4 mech-btn"
                    >
                      CLOSE SPECIFICATION
                    </button>
                  </div>
                </div>
              )}

              {/* RESEARCH CONTENT */}
              {activeModal === 'RESEARCH' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] font-mono-code text-[#8E9299]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5E7EB]" />
                    <span>YU RESEARCH · PAPER TR-2026.04</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-light tracking-[0.14em] text-white font-display">
                    AGENT DRIFT & GOVERNED STATE TRANSITIONS
                  </h2>

                  <div className="h-[1px] w-full bg-[#1F2937]" />

                  <div className="space-y-4 text-sm leading-relaxed text-[#D1D5DB] font-light">
                    <p className="text-white">
                      <strong>Abstract:</strong> Autonomous agent loops without structural gating suffer from compounding semantic drift, hallucinated completion, and silent dependency corruption.
                    </p>
                    <p>
                      Our research demonstrates that adding more conversational prompting does not solve multi-file regression. Only hard topological graph boundaries and external audit gates provide deterministic construction safety.
                    </p>
                    <div className="p-4 bg-[#0E1012] border border-[#1F2937] text-xs font-mono-code text-[#8E9299] space-y-2">
                      <div className="text-[#E5E7EB]">KEY FINDINGS:</div>
                      <div>· Self-reporting verification error rate: 41.8%</div>
                      <div>· Gate-audited construction error capture: 99.4%</div>
                      <div>· Context bleed reduction under Node Scoping: -88.2%</div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#1F2937] text-xs font-mono-code text-[#8E9299]">
                    <span>RESEARCH DIVISION · YU LABS</span>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="text-[#D1D5DB] hover:text-white underline underline-offset-4 mech-btn"
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

