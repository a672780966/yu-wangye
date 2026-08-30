import React from 'react';
import { motion } from 'motion/react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="section-problem" className="relative w-full min-h-screen py-32 px-6 md:px-16 flex flex-col justify-center border-t border-[#1F2937]/50 bg-[#0A0B0B]">
      {/* Precision Background Coordinate Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-gradient-to-b from-transparent via-[#2E3440] to-transparent" />
        <div className="absolute top-0 bottom-0 right-1/4 w-[1px] bg-gradient-to-b from-transparent via-[#2E3440] to-transparent" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#2E3440] to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Section Identifier */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 text-xs tracking-[0.35em] text-[#8E9299] font-mono-code mb-12"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
          <span>02 / THE PROBLEM</span>
        </motion.div>

        {/* Primary Duality Statement in Sleek Interface Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="space-y-3 md:space-y-4 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-[0.14em] text-[#F3F4F6] uppercase">
            INTELLIGENCE IS ABUNDANT.
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-[0.14em] text-[#D4AF37] uppercase drop-shadow-[0_0_24px_rgba(212,175,55,0.25)]">
            CONTROL IS NOT.
          </h2>
        </motion.div>

        {/* Fine Architectural Divider */}
        <div className="relative w-full h-[1px] bg-[#1F2937] my-12">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#4B5563] rounded-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#4B5563] rounded-full" />
        </div>

        {/* Two-Column Deep Narrative (No Cards, Pure Space & Typography) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left Column: Core Thesis */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="text-xl md:text-2xl font-light text-[#E5E7EB] leading-relaxed tracking-wide">
              模型会写代码，不代表项目已经成为产品。
            </p>
            <p className="text-sm md:text-base text-[#8E9299] font-light leading-relaxed">
              Demo 可以运行，可以展示，可以看起来完成。
              但真实配置、持久化、边界条件、回归、构建、打包、验证和发布准备，可能仍然没有完成。
            </p>
          </motion.div>

          {/* Right Column: Precise Boundary Contrast */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 space-y-8 border-l border-[#1F2937] pl-6 md:pl-10"
          >
            <div className="space-y-3 font-mono-code text-xs">
              <div className="text-[#6B7280] tracking-[0.2em]">EPISTEMIC ILLUSION</div>
              <div className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B5563]" />
                <span>Statistically fluent snippet generation</span>
              </div>
              <div className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B5563]" />
                <span>Unverified cross-module side effects</span>
              </div>
              <div className="flex items-center gap-3 text-[#9CA3AF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B5563]" />
                <span>Unchecked runtime environment drift</span>
              </div>
            </div>

            {/* Axiomatic Statement */}
            <div className="pt-4">
              <div className="text-xs font-mono-code tracking-[0.25em] text-[#6B7280] mb-2">
                THE YU PRINCIPLE
              </div>
              <p className="text-lg md:text-xl font-display font-normal text-[#F3F4F6] tracking-[0.06em] leading-snug">
                YU does not confuse <span className="text-[#9CA3AF] italic">“it runs”</span> with <span className="text-[#D4AF37]">“it is ready.”</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

