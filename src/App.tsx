import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { HarnessLayerSection } from './components/HarnessLayerSection';
import { ConstructionRailSection } from './components/ConstructionRailSection';
import { ControlSystemSection } from './components/ControlSystemSection';
import { ControlledNodeSection } from './components/ControlledNodeSection';
import { WorkbenchSection } from './components/WorkbenchSection';
import { StructuralIntelligenceSection } from './components/StructuralIntelligenceSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { PromiseSection } from './components/PromiseSection';
import { FinalCTA } from './components/FinalCTA';
import { EnterModal } from './components/EnterModal';

export default function App() {
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#0A0B0B] text-[#D1D5DB] selection:bg-[#D4AF37]/20 selection:text-[#F3F4F6] overflow-hidden">
      {/* Sleek Interface Ambient Dot Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 sleek-grid-bg z-0" />

      {/* Sleek Interface Atmospheric Radial Soft Glows */}
      <div className="fixed top-[5%] left-[-10%] w-[650px] h-[650px] rounded-full blur-[160px] pointer-events-none sleek-glow z-0" />
      <div className="fixed bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none sleek-glow z-0" />

      {/* Sleek Interface Reticle SVG Markings */}
      <div className="fixed bottom-12 right-12 w-[300px] h-[300px] opacity-[0.04] pointer-events-none z-0 hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.05" />
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.05" opacity="0.5" />
        </svg>
      </div>

      {/* Sleek Interface Fixed Left HUD Aside */}
      <aside className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 z-30 pointer-events-none select-none">
        <div className="flex flex-col gap-2">
          <div className="w-[1px] h-28 bg-gradient-to-b from-transparent via-[#4B5563] to-transparent ml-[3px]" />
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full border border-[#4B5563] bg-transparent" />
            <span className="text-[9px] tracking-[0.25em] text-[#6B7280] font-mono-code rotate-[-90deg] origin-left translate-x-2 whitespace-nowrap">
              STATUS: GOVERNED
            </span>
          </div>
        </div>
      </aside>

      {/* Relative Content Container */}
      <div className="relative z-10">
        {/* Precision Header */}
        <Header onEnterClick={() => setIsEnterModalOpen(true)} />

        {/* 01. Hero Section with Parametric Möbius Infinity Canvas */}
        <HeroSection onScrollClick={() => scrollToSection('section-problem')} />

        {/* 02. The Problem: Intelligence is abundant. Control is not. */}
        <ProblemSection />

        {/* 03. Harness Layer: Models / Agents / Skills / MCP / Tools / Runtime */}
        <HarnessLayerSection />

        {/* 04. Construction Structural Rail: Intent to Verified Delivery */}
        <ConstructionRailSection />

        {/* 05. Control is a System: Three Axioms (Execution ≠ Pass, Test Pass ≠ Audit Pass, Release Ready ≠ Released) */}
        <ControlSystemSection />

        {/* 06. Controlled Node: The Atomic Construction Unit */}
        <ControlledNodeSection />

        {/* 07. Workbench: Embedded 4-Zone Engineering Device (Where, What, Why, How/Who) */}
        <WorkbenchSection />

        {/* 08. Structural Intelligence: 3 Projections (Planning, Construction, Implementation) */}
        <StructuralIntelligenceSection />

        {/* 09. Architectural Sovereignty: Local-First / Model-Independent / Node-Scoped */}
        <ArchitectureSection />

        {/* 10. The Real Promise: A Demo is Not a Product / Don't Fake Done */}
        <PromiseSection />

        {/* 11. Final CTA & Recirculation */}
        <FinalCTA
          onEnterClick={() => setIsEnterModalOpen(true)}
          onExploreClick={() => scrollToSection('section-rail')}
        />
      </div>

      {/* Interactive Enter Workbench Modal */}
      <EnterModal
        isOpen={isEnterModalOpen}
        onClose={() => setIsEnterModalOpen(false)}
      />
    </main>
  );
}

