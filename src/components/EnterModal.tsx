import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Terminal, ShieldCheck, FolderTree, Cpu, Check, Sparkles, ArrowRight } from 'lucide-react';

interface EnterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnterModal: React.FC<EnterModalProps> = ({ isOpen, onClose }) => {
  const [projectPath, setProjectPath] = useState('~/workspace/core-production-service');
  const [selectedExecutor, setSelectedExecutor] = useState('Claude-3.7-Sonnet (Local MCP Bounded)');
  const [auditMode, setAuditMode] = useState<'STRICT' | 'STANDARD'>('STRICT');
  const [isInitializing, setIsInitializing] = useState(false);
  const [initLogs, setInitLogs] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  if (!isOpen) return null;

  const handleLaunch = () => {
    setIsInitializing(true);
    setInitLogs([
      'Connecting to local daemon on unix:///var/run/yu.sock...',
      'Validating local project workspace AST...',
      'Checking git repository clean boundary state...',
      'Initializing Isolated Controlled Node Envelope...',
      'Configuring Adversarial Independent Audit Node (Gate 01-09)...',
      'YU Local Construction Workbench ready on port 3000.',
    ]);
    setTimeout(() => {
      setIsInitializing(false);
      setIsReady(true);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl bg-[#080B12] border border-slate-800 p-6 md:p-10 text-slate-300 shadow-2xl rounded-xs font-mono-code"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-2 text-xs text-amber-300 tracking-widest">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>ENTER YU WORKBENCH</span>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-light text-white tracking-wider">
            INITIALIZE CONTROLLED WORKSPACE
          </h3>
          <p className="text-xs text-slate-400 font-sans font-light">
            Connect your local repository to YU's governed construction runtime.
          </p>
        </div>

        {/* Configuration Matrix */}
        {!isReady ? (
          <div className="space-y-5 text-xs">
            {/* Project Path */}
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[11px] tracking-wider">01. LOCAL PROJECT PATH</label>
              <div className="flex items-center gap-2 px-3 py-2 bg-[#040609] border border-slate-800 text-slate-200">
                <FolderTree className="w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={projectPath}
                  onChange={(e) => setProjectPath(e.target.value)}
                  className="bg-transparent flex-1 focus:outline-none text-slate-200"
                />
              </div>
            </div>

            {/* Executor Model Choice (Model-Independent) */}
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[11px] tracking-wider">02. EXECUTION ENGINE (MODEL-INDEPENDENT)</label>
              <select
                value={selectedExecutor}
                onChange={(e) => setSelectedExecutor(e.target.value)}
                className="w-full px-3 py-2 bg-[#040609] border border-slate-800 text-slate-200 focus:outline-none"
              >
                <option>Claude-3.7-Sonnet (Local MCP Bounded)</option>
                <option>Gemini-2.0-Flash (High-Throughput Node Worker)</option>
                <option>GPT-4.5 (Constrained AST Generator)</option>
                <option>Local DeepSeek-R1 / Ollama (Offline Air-Gapped)</option>
              </select>
            </div>

            {/* Audit Strictness */}
            <div className="space-y-1.5">
              <label className="text-slate-400 text-[11px] tracking-wider">03. GOVERNANCE & INDEPENDENT AUDIT</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAuditMode('STRICT')}
                  className={`p-3 text-left border ${
                    auditMode === 'STRICT'
                      ? 'border-amber-400/80 bg-[#121928] text-white'
                      : 'border-slate-800 bg-[#040609] text-slate-400'
                  }`}
                >
                  <div className="font-semibold text-amber-300 mb-0.5">STRICT AUDIT GATE</div>
                  <div className="text-[10px] text-slate-400 font-sans">Adversarial audit + 100% formal readiness pass required</div>
                </button>
                <button
                  type="button"
                  onClick={() => setAuditMode('STANDARD')}
                  className={`p-3 text-left border ${
                    auditMode === 'STANDARD'
                      ? 'border-amber-400/80 bg-[#121928] text-white'
                      : 'border-slate-800 bg-[#040609] text-slate-400'
                  }`}
                >
                  <div className="font-semibold text-slate-200 mb-0.5">STANDARD GATE</div>
                  <div className="text-[10px] text-slate-400 font-sans">Typecheck, build integrity & unit evidence snapshot</div>
                </button>
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">DAEMON: LOCALHOST:3000 ACTIVE</span>
              <button
                disabled={isInitializing}
                onClick={handleLaunch}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#0C121E] hover:bg-[#162033] border border-slate-700 hover:border-amber-400 text-slate-100 text-xs tracking-widest transition-all duration-200"
              >
                {isInitializing ? 'INITIALIZING...' : 'LAUNCH WORKBENCH'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-[#040609] border border-emerald-500/40 text-emerald-400 text-xs space-y-1.5">
              <div className="font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>LOCAL WORKSPACE ATTACHED SUCCESSFULLY</span>
              </div>
              <p className="text-slate-400 text-[11px] font-sans">
                Active root: <span className="text-slate-200">{projectPath}</span>
              </p>
            </div>

            <div className="p-4 bg-[#040609] border border-slate-800 text-[11px] text-slate-400 space-y-1">
              {initLogs.map((log, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-slate-600">›</span>
                  <span className={i === initLogs.length - 1 ? 'text-amber-300' : 'text-slate-400'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsReady(false)}
                className="text-xs text-slate-500 hover:text-slate-300 underline underline-offset-4"
              >
                RECONFIGURE
              </button>
              <button
                onClick={() => {
                  onClose();
                  const target = document.getElementById('section-workbench');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-xs tracking-wider"
              >
                INSPECT LIVE WORKBENCH
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
