import React from 'react';
import { motion } from 'motion/react';
import { HardDrive, Network, ShieldCheck } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="section-architecture" className="relative w-full min-h-screen py-32 px-6 md:px-16 flex flex-col justify-center border-t border-[#1F2937]/50 bg-[#0A0B0B]">
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
          <span>09 / ARCHITECTURAL SOVEREIGNTY</span>
        </motion.div>

        {/* Narrative Headline */}
        <div className="mb-16 space-y-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-[0.14em] text-white uppercase">
            YOUR PROJECT.
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-[0.14em] text-[#D1D5DB] uppercase">
            YOUR EXECUTORS.
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-[0.14em] text-[#D4AF37] uppercase drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            YOUR CONTROL.
          </h2>
        </div>

        {/* 3 Minimal Columns (Pure Typography & Subtle Borders) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-[#1F2937] pt-12">
          {/* Column 1: LOCAL-FIRST */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <h3 className="font-mono-code text-sm md:text-base tracking-[0.25em] text-white uppercase font-medium">
                LOCAL-FIRST
              </h3>
            </div>
            <p className="text-sm md:text-base text-[#D1D5DB] font-light leading-relaxed">
              项目事实首先属于本地工作区。
            </p>
            <p className="text-xs text-[#8E9299] font-light leading-relaxed">
              源代码、AST 索引、测试套件与审计证据全部驻留于本地工作空间。无不可控的云端黑盒状态漂移。
            </p>
          </motion.div>

          {/* Column 2: MODEL-INDEPENDENT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#94BBC9]" />
              <h3 className="font-mono-code text-sm md:text-base tracking-[0.25em] text-white uppercase font-medium">
                MODEL-INDEPENDENT
              </h3>
            </div>
            <p className="text-sm md:text-base text-[#D1D5DB] font-light leading-relaxed">
              具体 Executor 可以替换，不构成 YU 的产品身份。
            </p>
            <p className="text-xs text-[#8E9299] font-light leading-relaxed">
              模型是可拔插的执行力引擎。无论未来模型如何迭代，YU 的施工图、证据链与审计铁律始终有效。
            </p>
          </motion.div>

          {/* Column 3: NODE-SCOPED CAPABILITY */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
              <h3 className="font-mono-code text-sm md:text-base tracking-[0.25em] text-white uppercase font-medium">
                NODE-SCOPED CAPABILITY
              </h3>
            </div>
            <p className="text-sm md:text-base text-[#D1D5DB] font-light leading-relaxed">
              Skill、MCP、Tool 与权限属于当前施工 Node，而不是无限开放给所有 Agent。
            </p>
            <p className="text-xs text-[#8E9299] font-light leading-relaxed">
              最小特权原则硬编码进每个节点。禁止跨节点盲目共享权限，彻底杜绝代理失控与意料外的破坏。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
