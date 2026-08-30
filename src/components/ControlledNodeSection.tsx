import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NodeAttribute } from '../types';

const NODE_ATTRIBUTES: NodeAttribute[] = [
  {
    id: 'scope',
    name: 'SCOPE',
    zhLabel: '施工范围',
    description: 'Defines the exact files, modules, and functions permitted for mutation.',
    codeSnippet: 'fileMask: ["/src/services/auth.ts", "/src/types.ts"]\nmutationLimit: 120 lines',
    badge: 'MUTATION BOUNDARY',
  },
  {
    id: 'dependencies',
    name: 'DEPENDENCIES',
    zhLabel: '拓扑依赖',
    description: 'Upstream nodes and interface contracts that must be verified before execution.',
    codeSnippet: 'requires: ["NODE-012:db_schema", "NODE-014:session_token"]\nstate: SEALED_PASS',
    badge: 'DAG TOPOLOGY',
  },
  {
    id: 'context',
    name: 'CONTEXT',
    zhLabel: '作用域上下文',
    description: 'Injected minimum necessary AST slices, preventing prompt pollution and semantic drift.',
    codeSnippet: 'astTokens: 1,420\ninjectedTypes: ["Session", "AuthGuard"]',
    badge: 'LEAN CONTEXT',
  },
  {
    id: 'capabilities',
    name: 'CAPABILITIES',
    zhLabel: '工具与权限',
    description: 'Explicit MCP tools, compilers, and sandboxed CLIs granted to this specific node.',
    codeSnippet: 'grantedTools: ["tsc --noEmit", "vitest run auth"]\nnetwork: DISABLED',
    badge: 'ISOLATED TOOLS',
  },
  {
    id: 'artifacts',
    name: 'ARTIFACTS',
    zhLabel: '确定性产物',
    description: 'The concrete outputs: code diffs, generated interfaces, migration scripts, and documentation.',
    codeSnippet: 'outputFiles: ["/src/services/auth.ts"]\nlockfileUpdated: false',
    badge: 'DETERMINISTIC OUTPUT',
  },
  {
    id: 'acceptance',
    name: 'ACCEPTANCE',
    zhLabel: '验收准则',
    description: 'Formal programmatic invariants that must be satisfied for completion.',
    codeSnippet: 'criteria: ["Returns 401 on expired JWT", "Zero type regressions"]',
    badge: 'FORMAL CONTRACT',
  },
  {
    id: 'evidence',
    name: 'EVIDENCE',
    zhLabel: '可复现证据',
    description: 'Zero exit-code build logs, test snapshots, and cryptographic execution traces.',
    codeSnippet: 'testRunId: "test_88f92"\nexitCode: 0\ncoverage: 98.4%',
    badge: 'REPRODUCIBLE PROOF',
  },
  {
    id: 'audit',
    name: 'AUDIT',
    zhLabel: '独立审计',
    description: 'Adversarial auditor node verification score and formal acceptance signature.',
    codeSnippet: 'auditor: "NODE-AUDIT-ADVERSARY-02"\nverdict: VERIFIED_PASS',
    badge: 'ADVERSARIAL GATE',
  },
];

export const ControlledNodeSection: React.FC = () => {
  const [selectedAttr, setSelectedAttr] = useState<NodeAttribute>(NODE_ATTRIBUTES[0]);

  return (
    <section id="section-node" className="relative w-full min-h-screen py-32 px-6 md:px-16 flex flex-col justify-center border-t border-[#1F2937]/50 bg-[#0A0B0B]">
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
          <span>06 / CONTROLLED NODE</span>
        </motion.div>

        {/* Narrative Headline */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light tracking-[0.14em] text-white uppercase mb-2">
            ONE UNIT OF WORK.
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light tracking-[0.14em] text-[#8E9299] uppercase mb-6">
            CLEAR BOUNDARIES.
          </h2>
          <p className="text-sm md:text-base text-[#D1D5DB] font-light max-w-2xl leading-relaxed">
            每个 Node 都知道自己能改什么、依赖什么、需要什么能力、必须产生什么，以及怎样才算真正完成。
          </p>
        </div>

        {/* Technical Node Radial Architecture Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Center Node Structure Representation */}
          <div className="lg:col-span-7 relative p-6 md:p-10 border border-[#1F2937] bg-[#0E1012] rounded-xs shadow-xl">
            {/* Background Structural Matrix */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="w-full h-full sleek-grid-bg" />
            </div>

            {/* Central Node Core */}
            <div className="relative z-10 flex flex-col items-center mb-8">
              <div className="flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/50 bg-[#121418] rounded-xs shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-display tracking-[0.3em] text-sm md:text-base text-white font-medium pl-[0.3em]">
                  NODE
                </span>
                <span className="text-[10px] font-mono-code text-[#8E9299] pl-2 border-l border-[#374151]">
                  ATOMIC WORKBENCH UNIT
                </span>
              </div>
            </div>

            {/* 8 Node Boundary Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3 relative z-10">
              {NODE_ATTRIBUTES.map((attr) => {
                const isSelected = selectedAttr.id === attr.id;
                return (
                  <button
                    key={attr.id}
                    onClick={() => setSelectedAttr(attr)}
                    className={`p-3 text-left transition-all duration-200 border rounded-xs mech-btn ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#171A20] shadow-[0_0_12px_rgba(212,175,55,0.1)]'
                        : 'border-[#1F2937] bg-[#0A0C0E] hover:border-[#4B5563] hover:bg-[#121418]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-mono-code text-[#6B7280]">{attr.zhLabel}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 mech-dot ${
                          isSelected ? 'bg-[#D4AF37] scale-125' : 'bg-[#4B5563]'
                        }`}
                      />
                    </div>
                    <div
                      className={`text-xs font-mono-code tracking-wider ${
                        isSelected ? 'text-white font-medium' : 'text-[#D1D5DB]'
                      }`}
                    >
                      {attr.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Attribute Inspector Pane */}
          <div className="lg:col-span-5 p-6 md:p-8 border border-[#1F2937] bg-[#0E1012] rounded-xs space-y-4 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAttr.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
                  <div>
                    <span className="text-[10px] font-mono-code tracking-[0.2em] text-[#8E9299] uppercase">
                      {selectedAttr.badge}
                    </span>
                    <h4 className="font-mono-code text-base text-white font-medium tracking-wider mt-0.5">
                      {selectedAttr.name} · {selectedAttr.zhLabel}
                    </h4>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                </div>

                <p className="text-xs md:text-sm text-[#D1D5DB] font-light leading-relaxed">
                  {selectedAttr.description}
                </p>

                {/* Code / Invariant Contract Display */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono-code tracking-widest text-[#6B7280]">
                    SCHEMA INVARIANT:
                  </div>
                  <pre className="p-3.5 bg-[#060708] border border-[#1F2937] rounded-xs text-[11px] font-mono-code text-[#94BBC9] leading-relaxed overflow-x-auto">
                    <code>{selectedAttr.codeSnippet}</code>
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

