import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderTree, Cpu, CheckCircle2, GitCommit } from 'lucide-react';

type ZoneKey = 'EXPLORER' | 'WORKSPACE' | 'COPILOT' | 'DOCK';

export const WorkbenchSection: React.FC = () => {
  const [activeZone, setActiveZone] = useState<ZoneKey>('WORKSPACE');
  const [hoveredZone, setHoveredZone] = useState<ZoneKey | null>(null);
  const [activeTab, setActiveTab] = useState<'DIFF' | 'EVIDENCE' | 'GATES'>('EVIDENCE');

  const focusedZone = hoveredZone || activeZone;

  return (
    <section id="section-workbench" className="relative w-full min-h-screen py-32 px-4 sm:px-6 md:px-12 flex flex-col justify-center border-t border-[#1F2937]/50 bg-[#0A0B0B]">
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
          <span>07 / WORKBENCH</span>
        </motion.div>

        {/* Narrative Headline */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light tracking-[0.14em] text-white uppercase mb-2">
            SEE THE PROJECT.
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light tracking-[0.14em] text-[#8E9299] uppercase mb-6">
            NOT JUST THE CHAT.
          </h2>
          <p className="text-sm md:text-base text-[#D1D5DB] font-light max-w-2xl leading-relaxed">
            YU 把项目事实、施工状态、代码关系、阻断、Evidence 和决策重新放回一个可以理解的工程空间。
          </p>
        </div>

        {/* Four-Zone Navigator Matrix (Focus Lens Switchers) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {[
            { id: 'EXPLORER', label: 'EXPLORER', question: 'WHERE', desc: 'File system, AST scopes & module boundaries' },
            { id: 'WORKSPACE', label: 'MAIN WORKSPACE', question: 'WHAT', desc: 'Active construction artifact, diffs & gates' },
            { id: 'COPILOT', label: 'YU COPILOT', question: 'WHY', desc: 'Architecture intent, rationale & decision logs' },
            { id: 'DOCK', label: 'NODE DOCK', question: 'HOW / WHO', desc: 'Assigned executors, MCP tools & token budgets' },
          ].map((zone) => {
            const isSelected = activeZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id as ZoneKey)}
                onMouseEnter={() => setHoveredZone(zone.id as ZoneKey)}
                onMouseLeave={() => setHoveredZone(null)}
                className={`p-3.5 text-left border rounded-xs mech-btn transition-all duration-200 ${
                  isSelected
                    ? 'border-[#D4AF37] bg-[#14171E] shadow-[0_0_12px_rgba(212,175,55,0.12)]'
                    : 'border-[#1F2937] bg-[#0A0C0E] hover:border-[#4B5563] hover:bg-[#101216]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono-code mb-1">
                  <span className={isSelected ? 'text-[#D4AF37]' : 'text-[#6B7280]'}>
                    [{zone.question}]
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 mech-dot ${
                      isSelected
                        ? 'bg-[#D4AF37] scale-125 shadow-[0_0_8px_rgba(212,175,55,0.9)]'
                        : 'bg-[#374151]'
                    }`}
                  />
                </div>
                <div className={`text-xs font-mono-code tracking-wider ${isSelected ? 'text-white font-medium' : 'text-[#8E9299]'}`}>
                  {zone.label}
                </div>
                <div className="text-[10px] text-[#6B7280] font-light mt-1 truncate">
                  {zone.desc}
                </div>
              </button>
            );
          })}
        </div>

        {/* Precision Engineering Device Interface (Embedded Machine Frame with Focus Lens) */}
        <div className="border border-[#1F2937] bg-[#0A0C0E] rounded-xs shadow-2xl overflow-hidden font-mono-code">
          {/* Device Top Telemetry Bar */}
          <div className="px-4 py-2.5 bg-[#0E1012] border-b border-[#1F2937] flex items-center justify-between text-xs text-[#8E9299]">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white tracking-wider">YU WORKBENCH v2.4</span>
              <span className="text-[#374151] hidden sm:inline">|</span>
              <span className="text-[#8E9299] text-[11px] hidden sm:inline">PROJECT: LOCAL_APPLET_CORE</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-[#6B7280]">READINESS: <span className="text-[#D4AF37]">92.4%</span></span>
              <span className="text-[#6B7280] hidden md:inline">AUDIT: <span className="text-emerald-400">14/15 PASS</span></span>
              <span className="text-[#6B7280]">GATE: <span className="text-[#94BBC9]">07_PACKAGING</span></span>
            </div>
          </div>

          {/* 4-Zone Internal Layout with Lens Focus and Dimming */}
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
            {/* Zone 1: Explorer [WHERE] */}
            <div
              onClick={() => setActiveZone('EXPLORER')}
              className={`md:col-span-3 border-r border-[#1F2937] p-4 space-y-4 cursor-pointer transition-all duration-300 ${
                focusedZone === 'EXPLORER'
                  ? 'bg-[#12151B] opacity-100'
                  : 'bg-[#08090A] opacity-60 hover:opacity-90'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] tracking-widest border-b border-[#1F2937] pb-2">
                <span className={focusedZone === 'EXPLORER' ? 'text-[#D4AF37]' : 'text-[#6B7280]'}>
                  01. EXPLORER [WHERE]
                </span>
                <FolderTree className="w-3.5 h-3.5 text-[#6B7280]" />
              </div>

              <div className="space-y-1.5 text-xs text-[#8E9299]">
                <div className="text-[#6B7280] text-[10px]">AST BOUNDARIES:</div>
                <div className="flex items-center gap-2 text-[#E5E7EB] pl-1 py-1 bg-[#161922] border border-[#374151]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>/src/services/auth.ts</span>
                </div>
                <div className="flex items-center gap-2 pl-1 py-0.5 text-[#6B7280]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#374151]" />
                  <span>/src/types.ts</span>
                </div>
                <div className="flex items-center gap-2 pl-1 py-0.5 text-[#6B7280]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#374151]" />
                  <span>/src/db/schema.ts</span>
                </div>
                <div className="flex items-center gap-2 pl-1 py-0.5 text-[#6B7280]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#374151]" />
                  <span>/package.json</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1F2937] space-y-1.5 text-[11px]">
                <div className="text-[#6B7280] text-[10px]">NODE ENVELOPE:</div>
                <div className="text-[#D1D5DB]">NODE-042: JWT_RENEWAL</div>
                <div className="text-emerald-400 text-[10px]">✓ Zero Cross-File Bleed</div>
              </div>
            </div>

            {/* Zone 2: Main Workspace [WHAT] */}
            <div
              onClick={() => setActiveZone('WORKSPACE')}
              className={`md:col-span-6 p-4 space-y-4 cursor-pointer transition-all duration-300 ${
                focusedZone === 'WORKSPACE'
                  ? 'bg-[#101318] opacity-100'
                  : 'bg-[#0A0C0E] opacity-60 hover:opacity-90'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#1F2937] pb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] tracking-widest ${focusedZone === 'WORKSPACE' ? 'text-[#D4AF37]' : 'text-[#6B7280]'}`}>
                    02. WORKSPACE [WHAT]
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px]">
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveTab('EVIDENCE'); }}
                    className={`px-2 py-0.5 border rounded-xs mech-btn ${
                      activeTab === 'EVIDENCE'
                        ? 'border-[#D4AF37] bg-[#171A20] text-[#D4AF37]'
                        : 'border-transparent text-[#6B7280] hover:text-[#D1D5DB]'
                    }`}
                  >
                    EVIDENCE
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveTab('DIFF'); }}
                    className={`px-2 py-0.5 border rounded-xs mech-btn ${
                      activeTab === 'DIFF'
                        ? 'border-[#D4AF37] bg-[#171A20] text-[#D4AF37]'
                        : 'border-transparent text-[#6B7280] hover:text-[#D1D5DB]'
                    }`}
                  >
                    AST DIFF
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveTab('GATES'); }}
                    className={`px-2 py-0.5 border rounded-xs mech-btn ${
                      activeTab === 'GATES'
                        ? 'border-[#D4AF37] bg-[#171A20] text-[#D4AF37]'
                        : 'border-transparent text-[#6B7280] hover:text-[#D1D5DB]'
                    }`}
                  >
                    GATES
                  </button>
                </div>
              </div>

              {/* Dynamic Viewport with Micro-Transitions */}
              <AnimatePresence mode="wait">
                {activeTab === 'EVIDENCE' && (
                  <motion.div
                    key="evidence"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-3 text-xs"
                  >
                    <div className="p-3 bg-[#060708] border border-[#1F2937] text-[#D1D5DB] rounded-xs space-y-2">
                      <div className="text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>EVIDENCE_RUN_#902: TYPECHECK & COMPILATION PASS</span>
                      </div>
                      <div className="text-[#8E9299] text-[11px] font-mono-code leading-relaxed">
                        $ tsc --noEmit --project tsconfig.json<br />
                        ✓ 0 errors, 0 warnings (found in 420ms)<br />
                        $ vitest run auth.test.ts<br />
                        ✓ 12/12 assertions passed. Determinism score: 1.00
                      </div>
                    </div>

                    <div className="p-3 bg-[#060708] border border-[#1F2937] text-[#D1D5DB] rounded-xs space-y-1">
                      <div className="text-[#94BBC9] text-[11px] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#94BBC9]" />
                        <span>INDEPENDENT AUDIT VERIFICATION:</span>
                      </div>
                      <p className="text-[#8E9299] text-[11px] font-light">
                        Audit Node #07 verified that cryptographic tokens expire precisely after 3600s with zero cookie leakage.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'DIFF' && (
                  <motion.div
                    key="diff"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="p-3 bg-[#060708] border border-[#1F2937] rounded-xs text-[11px] font-mono-code space-y-1 text-[#8E9299]"
                  >
                    <div className="text-[#6B7280]">@@ -24,7 +24,9 @@ export async function renewToken</div>
                    <div className="text-rose-400">- if (token.isExpired) return null;</div>
                    <div className="text-emerald-400">+ const isValid = await verifyWithAuditSecret(token);</div>
                    <div className="text-emerald-400">+ if (!isValid) throw new SecurityBoundaryError('TOKEN_EXPIRED');</div>
                    <div className="text-[#8E9299]">  return generateSealedSession(token.userId);</div>
                  </motion.div>
                )}

                {activeTab === 'GATES' && (
                  <motion.div
                    key="gates"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-2 text-xs"
                  >
                    <div className="p-2.5 bg-[#060708] border border-[#1F2937] flex items-center justify-between">
                      <span className="text-[#D1D5DB]">GATE 04: Token Ceiling Invariant</span>
                      <span className="text-emerald-400 text-[10px]">SATISFIED</span>
                    </div>
                    <div className="p-2.5 bg-[#060708] border border-[#1F2937] flex items-center justify-between">
                      <span className="text-[#D1D5DB]">GATE 05: Independent Adversarial Audit</span>
                      <span className="text-emerald-400 text-[10px]">SATISFIED</span>
                    </div>
                    <div className="p-2.5 bg-[#060708] border border-[#1F2937] flex items-center justify-between">
                      <span className="text-[#D1D5DB]">GATE 06: Zero Cross-Module Side-Effects</span>
                      <span className="text-[#D4AF37] text-[10px]">EVALUATING</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Zone 3 & 4: Copilot [WHY] and Node Dock [HOW/WHO] */}
            <div className="md:col-span-3 border-l border-[#1F2937] p-4 space-y-6 bg-[#08090A]">
              {/* YU Copilot [WHY] */}
              <div
                onClick={() => setActiveZone('COPILOT')}
                className={`p-2.5 rounded-xs cursor-pointer transition-all duration-300 ${
                  focusedZone === 'COPILOT'
                    ? 'bg-[#12151B] border border-[#374151]'
                    : 'opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] tracking-widest border-b border-[#1F2937] pb-1.5 mb-2">
                  <span className={focusedZone === 'COPILOT' ? 'text-[#D4AF37]' : 'text-[#6B7280]'}>
                    03. COPILOT [WHY]
                  </span>
                  <Cpu className="w-3.5 h-3.5 text-[#6B7280]" />
                </div>
                <p className="text-[11px] text-[#8E9299] font-light leading-relaxed">
                  “Intent deconstructed to eliminate regression risk in session persistence. Scope locked to auth module.”
                </p>
              </div>

              {/* Node Dock [HOW / WHO] */}
              <div
                onClick={() => setActiveZone('DOCK')}
                className={`p-2.5 rounded-xs cursor-pointer transition-all duration-300 ${
                  focusedZone === 'DOCK'
                    ? 'bg-[#12151B] border border-[#374151]'
                    : 'opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] tracking-widest border-b border-[#1F2937] pb-1.5 mb-2">
                  <span className={focusedZone === 'DOCK' ? 'text-[#D4AF37]' : 'text-[#6B7280]'}>
                    04. DOCK [HOW/WHO]
                  </span>
                  <GitCommit className="w-3.5 h-3.5 text-[#6B7280]" />
                </div>
                <div className="space-y-1 text-[11px] font-mono-code">
                  <div className="text-[#8E9299]">EXECUTOR: <span className="text-white">Claude-3.7-Sonnet</span></div>
                  <div className="text-[#8E9299]">AUDITOR: <span className="text-[#D4AF37]">Gemini-2.0-Flash-Audit</span></div>
                  <div className="text-[#8E9299]">TOOLS: <span className="text-[#94BBC9]">Node-CLI, MCP-Postgres</span></div>
                  <div className="text-[#8E9299]">STATUS: <span className="text-emerald-400">BOUNDED_OK</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

