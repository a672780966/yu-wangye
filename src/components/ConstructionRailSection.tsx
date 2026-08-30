import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConstructionStep } from '../types';

const CONSTRUCTION_STEPS: ConstructionStep[] = [
  {
    id: '01',
    number: '01',
    name: 'IDEA',
    zhName: '原始意图',
    description: 'Human conceptual inspiration, product intent, and initial prompt boundary.',
    governanceGate: 'Gate 0: Intent disambiguation and domain boundary initialization',
    evidenceType: 'User requirement manifest (spec.md)',
  },
  {
    id: '02',
    number: '02',
    name: 'PRODUCT DEFINITION',
    zhName: '产品定义',
    description: 'Deconstructing intent into verifiable functional contracts, user stories, and acceptance criteria.',
    governanceGate: 'Gate 1: Acceptance criteria determinism validation',
    evidenceType: 'Formal product contract & schema invariants',
  },
  {
    id: '03',
    number: '03',
    name: 'CONTROLLED NODES',
    zhName: '受控施工节点',
    description: 'Partitioning scope into isolated, atomic DAG nodes with strict file masks and capabilities.',
    governanceGate: 'Gate 2: Acyclic dependency graph & scope overlap audit',
    evidenceType: 'Topological node DAG with boundary masks',
  },
  {
    id: '04',
    number: '04',
    name: 'EXECUTION',
    zhName: '受限执行',
    description: 'Targeted model generation confined within the node envelope. Zero unauthorized file mutations.',
    governanceGate: 'Gate 3: Token boundary & capability ceiling enforcement',
    evidenceType: 'Structured AST diff & execution trace logs',
  },
  {
    id: '05',
    number: '05',
    name: 'EVIDENCE',
    zhName: '证据沉淀',
    description: 'Generating concrete, reproducible evidence: typecheck output, unit tests, and terminal exit codes.',
    governanceGate: 'Gate 4: Evidence reproducibility validation in clean container',
    evidenceType: 'Exit-code zero assertion & test coverage snapshot',
  },
  {
    id: '06',
    number: '06',
    name: 'INDEPENDENT AUDIT',
    zhName: '独立审计',
    description: 'Separate adversarial verification agent and deterministic rules evaluate output against acceptance criteria.',
    governanceGate: 'Gate 5: Non-self-authorizing adversarial audit check',
    evidenceType: 'Cryptographic audit report signed by audit node',
  },
  {
    id: '07',
    number: '07',
    name: 'VERIFICATION',
    zhName: '综合校验',
    description: 'Full-system integration compilation, schema validation, and cross-module regression regression checks.',
    governanceGate: 'Gate 6: Zero cross-boundary side-effect verification',
    evidenceType: 'Global build artifact & bundle integrity score',
  },
  {
    id: '08',
    number: '08',
    name: 'PACKAGING',
    zhName: '确定性打包',
    description: 'Assembling verified source trees, configuration manifests, and container image layers.',
    governanceGate: 'Gate 7: Deterministic bit-for-bit packaging verification',
    evidenceType: 'OCI container digest & lockfile SHA-256',
  },
  {
    id: '09',
    number: '09',
    name: 'VALIDATION',
    zhName: '端到端验收',
    description: 'Headless browser runtime execution and synthetic user journey verification in ephemeral sandboxes.',
    governanceGate: 'Gate 8: Synthetic E2E playback pass threshold',
    evidenceType: 'Video playback log, DOM state assertions',
  },
  {
    id: '10',
    number: '10',
    name: 'RELEASE READINESS',
    zhName: '就绪度判定',
    description: 'YU computes formal mathematical release readiness score based on 100% satisfied gate evidence.',
    governanceGate: 'Gate 9: 100% gate compliance certificate',
    evidenceType: 'Formal Release Readiness Certificate',
  },
  {
    id: '11',
    number: '11',
    name: 'USER RELEASE',
    zhName: '主权交付',
    description: 'Final sovereign release authorization triggered exclusively by the human engineer.',
    governanceGate: 'Final Sovereign Gate: Human Release Signature Required',
    evidenceType: 'Production deployment trigger & git release tag',
  },
];

export const ConstructionRailSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<ConstructionStep>(CONSTRUCTION_STEPS[2]);
  const stepRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const activeIndex = CONSTRUCTION_STEPS.findIndex((s) => s.id === selectedStep.id);

  // Scroll spy to automatically update active step on scroll
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.5;
      for (const step of CONSTRUCTION_STEPS) {
        const el = stepRefs.current[step.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            setSelectedStep(step);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStepClick = (step: ConstructionStep) => {
    setSelectedStep(step);
    const el = stepRefs.current[step.id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="section-rail" className="relative w-full min-h-screen py-32 px-6 md:px-16 flex flex-col justify-center border-t border-[#1F2937]/50 bg-[#0A0B0B]">
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
          <span>04 / STRUCTURAL RAIL</span>
        </motion.div>

        {/* Two-Column Master Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Narrative Column (Sticky on Desktop) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-3"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light tracking-[0.14em] text-white uppercase">
                FROM INTENT
              </h2>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light tracking-[0.14em] text-[#8E9299] uppercase">
                TO VERIFIED DELIVERY.
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-sm md:text-base text-[#D1D5DB] font-light leading-relaxed"
            >
              YU 把软件开发从一次次 Agent 对话，转换为有 Scope、有依赖、有 Evidence、有独立 Audit、有明确 Gate 的施工过程。
            </motion.p>

            {/* Selected Step Inspector Box */}
            <div className="p-6 border border-[#1F2937] bg-[#0E1012] rounded-xs space-y-4 relative shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedStep.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                      <span className="font-mono-code text-xs text-[#D4AF37] tracking-wider font-medium">
                        PHASE {selectedStep.number} · {selectedStep.name}
                      </span>
                    </div>
                    <span className="text-xs text-[#6B7280] font-mono-code">{selectedStep.zhName}</span>
                  </div>

                  <p className="text-xs md:text-sm text-[#D1D5DB] font-light leading-relaxed">
                    {selectedStep.description}
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-mono-code">
                    <div className="text-[#8E9299]">
                      <span className="text-[#6B7280]">INVARIANT: </span>
                      <span className="text-[#E5E7EB]">{selectedStep.governanceGate}</span>
                    </div>
                    <div className="text-[#8E9299]">
                      <span className="text-[#6B7280]">EVIDENCE: </span>
                      <span className="text-[#94BBC9]">{selectedStep.evidenceType}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Precision Mechanical Structural Rail */}
          <div className="lg:col-span-7 relative">
            {/* The Rail Spine Track */}
            <div className="absolute top-6 bottom-6 left-6 md:left-8 w-[1px] bg-[#1F2937]">
              {/* Walked Progress Trail */}
              <div
                className="w-[1px] bg-gradient-to-b from-[#9CA3AF] via-[#D4AF37] to-transparent transition-all duration-300"
                style={{
                  height: `${((activeIndex >= 0 ? activeIndex : 0) / (CONSTRUCTION_STEPS.length - 1)) * 100}%`,
                }}
              />
            </div>

            <div className="space-y-3 relative z-10">
              {CONSTRUCTION_STEPS.map((step, idx) => {
                const isSelected = selectedStep.id === step.id;
                const isPassed = idx < activeIndex;
                const isAuditOrGate = ['03', '06', '10', '11'].includes(step.id);

                return (
                  <div
                    key={step.id}
                    ref={(el) => { stepRefs.current[step.id] = el; }}
                    onClick={() => handleStepClick(step)}
                    className={`group flex flex-col p-3 md:p-3.5 rounded-xs cursor-pointer transition-all duration-200 border mech-btn ${
                      isSelected
                        ? 'border-[#4B5563] bg-[#14171E] pl-5 shadow-[0_0_12px_rgba(212,175,55,0.08)]'
                        : isPassed
                        ? 'border-[#1F2937]/60 bg-[#0A0C0E] hover:border-[#374151]'
                        : 'border-transparent hover:border-[#1F2937] hover:bg-[#0A0C0E] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      {/* Anchor / State Dot on Spine */}
                      <div className="relative flex items-center justify-center w-4 h-4">
                        <div
                          className={`rounded-full transition-all duration-300 mech-dot ${
                            isSelected
                              ? 'w-2 h-2 bg-[#D4AF37] scale-125 shadow-[0_0_10px_rgba(212,175,55,0.9)]'
                              : isPassed
                              ? 'w-1.5 h-1.5 bg-[#9CA3AF]'
                              : isAuditOrGate
                              ? 'w-1.5 h-1.5 bg-[#94BBC9]'
                              : 'w-1 h-1 bg-[#374151] group-hover:bg-[#6B7280]'
                          }`}
                        />
                      </div>

                      {/* Step Number */}
                      <span className="font-mono-code text-[11px] text-[#6B7280] w-6">
                        {step.number}
                      </span>

                      {/* Step Name & Tag */}
                      <div className="flex-1 flex items-center justify-between">
                        <span
                          className={`font-mono-code text-xs md:text-sm tracking-[0.2em] transition-colors duration-200 ${
                            isSelected
                              ? 'text-white font-medium'
                              : isPassed
                              ? 'text-[#D1D5DB]'
                              : 'text-[#8E9299] group-hover:text-[#E5E7EB]'
                          }`}
                        >
                          {step.name}
                        </span>

                        <span className="text-[10px] font-mono-code text-[#6B7280] group-hover:text-[#8E9299] tracking-wider">
                          {step.zhName}
                        </span>
                      </div>

                      {/* Governance Pill / Gate Indicator */}
                      {isAuditOrGate && (
                        <span className={`text-[9px] font-mono-code tracking-widest px-2 py-0.5 border rounded-xs ${
                          isSelected
                            ? 'border-[#D4AF37]/60 text-[#D4AF37]'
                            : 'border-[#1F2937] text-[#6B7280]'
                        }`}>
                          GATE
                        </span>
                      )}
                    </div>

                    {/* Mobile Inline Collapsible Inspector */}
                    <div className="lg:hidden">
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 pt-3 border-t border-[#1F2937] pl-8 space-y-2 text-xs font-mono-code"
                        >
                          <p className="text-[#D1D5DB] font-sans text-xs">{step.description}</p>
                          <div className="text-[#94BBC9] text-[10px]">{step.governanceGate}</div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

