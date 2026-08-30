import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ControlAxiom } from '../types';

const AXIOMS: ControlAxiom[] = [
  {
    id: '01',
    number: '01',
    statement: 'EXECUTION ≠ PASS',
    subtext: 'Worker 完成任务，不代表节点已经通过。',
    zhExplanation: '执行者输出代码仅代表生成行为结束，必须经过独立类型验证、上下文依赖审计与断言矩阵测试。',
    mechanism: 'Deterministic Exit Code & AST Verification Gate',
  },
  {
    id: '02',
    number: '02',
    statement: 'TEST PASS ≠ AUDIT PASS',
    subtext: '施工者不能自己宣布施工完成。',
    zhExplanation: '任何负责生成代码的模型，均被系统严格剥夺自我审计资格。验收权归属于对立审计模型与形式化规则。',
    mechanism: 'Adversarial Non-Self-Authorizing Auditor',
  },
  {
    id: '03',
    number: '03',
    statement: 'RELEASE READY ≠ RELEASED',
    subtext: 'YU 可以计算 Release Readiness，但最终发布权始终属于 USER。',
    zhExplanation: '系统负责沉淀完整证据链并判定 100% 就绪度，但最终发布决策权永远由人类开发者主权签署。',
    mechanism: 'Sovereign Human Authorization Invariant',
  },
];

export const ControlSystemSection: React.FC = () => {
  const [hoveredAxiom, setHoveredAxiom] = useState<string | null>(null);

  return (
    <section id="section-control" className="relative w-full min-h-screen py-32 px-6 md:px-16 flex flex-col justify-center border-t border-[#1F2937]/50 bg-[#0A0B0B]">
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
          <span>05 / CONTROL IS A SYSTEM</span>
        </motion.div>

        {/* Core Philosophical Takeaway Banner */}
        <div className="mb-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-light tracking-[0.14em] text-[#D1D5DB] uppercase mb-4">
            YU 的差异不是 Agent 更聪明。
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-white tracking-[0.08em]">
            而是：<span className="text-[#D4AF37]">完成这件事的权力，不属于执行模型自己。</span>
          </p>
        </div>

        {/* Three Structural Declarations Connected by Structural Rail */}
        <div className="relative space-y-16 md:space-y-24">
          {/* Vertical Connecting Rail */}
          <div className="absolute top-8 bottom-8 left-4 md:left-8 w-[1px] bg-gradient-to-b from-[#4B5563] via-[#1F2937] to-transparent" />

          {AXIOMS.map((axiom, idx) => {
            const isHovered = hoveredAxiom === axiom.id;

            return (
              <motion.div
                key={axiom.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                onMouseEnter={() => setHoveredAxiom(axiom.id)}
                onMouseLeave={() => setHoveredAxiom(null)}
                className="relative pl-12 md:pl-20 group cursor-default transition-all duration-200"
              >
                {/* Mechanical Interlock Gate Anchor Node on the Rail */}
                <div className="absolute left-4 md:left-8 top-3 -translate-x-1/2 flex items-center justify-center">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isHovered
                        ? 'border-[#D4AF37] bg-[#14171E] shadow-[0_0_10px_rgba(212,175,55,0.8)]'
                        : 'border-[#4B5563] bg-[#0A0B0B] group-hover:border-[#9CA3AF]'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isHovered ? 'bg-[#D4AF37] scale-125' : 'bg-[#6B7280]'
                      }`}
                    />
                  </div>
                </div>

                {/* Axiom Number & Gate State */}
                <div className="flex items-center gap-3 font-mono-code text-xs tracking-[0.3em] text-[#6B7280] mb-2">
                  <span>AXIOM {axiom.number}</span>
                  <span className="text-[#374151]">|</span>
                  <span className={`text-[10px] tracking-widest ${isHovered ? 'text-[#D4AF37]' : 'text-[#6B7280]'}`}>
                    {isHovered ? 'INTERLOCK ACTIVE' : 'STRUCTURAL GATE'}
                  </span>
                </div>

                {/* Main Structural Statement */}
                <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-light tracking-[0.12em] text-[#F3F4F6] uppercase mb-4 group-hover:text-white transition-colors">
                  {axiom.statement}
                </h3>

                {/* Primary Explanation */}
                <div className="text-base sm:text-lg md:text-xl font-normal text-[#D1D5DB] tracking-wide mb-3">
                  {axiom.subtext}
                </div>

                {/* Technical Detail & Mechanism */}
                <div className="max-w-2xl text-xs md:text-sm text-[#8E9299] font-light leading-relaxed mb-3">
                  {axiom.zhExplanation}
                </div>

                <div
                  className={`inline-flex items-center gap-2 text-[11px] font-mono-code px-3 py-1 border rounded-xs transition-all duration-200 ${
                    isHovered
                      ? 'border-[#4B5563] bg-[#12151B] text-white'
                      : 'border-[#1F2937] bg-[#0E1012] text-[#D1D5DB]'
                  }`}
                >
                  <span className="text-[#6B7280]">ENFORCEMENT:</span>
                  <span className="text-[#94BBC9]">{axiom.mechanism}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

