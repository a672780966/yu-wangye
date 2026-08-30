import React from 'react';
import { motion } from 'motion/react';

export const PromiseSection: React.FC = () => {
  return (
    <section id="section-promise" className="relative w-full min-h-screen py-40 px-6 md:px-16 flex flex-col justify-center border-t border-[#1F2937]/50 bg-[#0A0B0B]">
      <div className="max-w-6xl mx-auto w-full text-center">
        {/* Section Identifier */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-3 text-xs tracking-[0.35em] text-[#8E9299] font-mono-code mb-16"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />
          <span>10 / THE REAL PROMISE</span>
        </motion.div>

        {/* Climax Narrative Sequence */}
        <div className="space-y-6 md:space-y-8 mb-20 max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-[0.14em] text-[#8E9299] uppercase"
          >
            A DEMO IS NOT A PRODUCT.
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-[1px] bg-[#D4AF37]/60 mx-auto"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-[0.14em] text-white uppercase drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]"
          >
            YU EXISTS FOR WHAT COMES NEXT.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl md:text-2xl text-[#D1D5DB] font-light tracking-wide pt-4"
          >
            真正困难的部分，往往发生在 Demo 能跑之后。
          </motion.p>
        </div>

        {/* The Core Institutional Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto p-8 md:p-12 border border-[#1F2937] bg-[#0E1012] rounded-xs space-y-6 text-left mb-24 shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
            <span className="text-[11px] font-mono-code tracking-[0.3em] text-[#8E9299] uppercase">
              THE SOVEREIGN PLEDGE
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          </div>

          <div className="space-y-4 text-sm md:text-base text-[#D1D5DB] font-light leading-relaxed">
            <p className="text-[#8E9299]">
              YU 不承诺软件永远没有 Bug。
            </p>
            <p className="text-white text-base md:text-lg font-normal">
              YU 承诺不会把只有 Demo 级证据的项目，冒充成已经可以交付的产品。
            </p>
          </div>
        </motion.div>

        {/* Master Axiomatic Slogan: DON'T FAKE DONE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-8"
        >
          <div className="text-[11px] tracking-[0.5em] text-[#6B7280] font-mono-code uppercase mb-4 pl-[0.5em]">
            SYSTEM INVARIANT
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-light tracking-[0.2em] text-[#E5E7EB] uppercase pl-[0.2em] select-none hover:text-white transition-colors">
            DON'T FAKE DONE.
          </h1>
        </motion.div>
      </div>
    </section>
  );
};
