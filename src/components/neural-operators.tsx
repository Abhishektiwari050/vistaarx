"use client";

import { useEffect, useState, useRef } from "react";
import { useScrollStore } from "@/lib/stores/scroll-store";
import { Terminal as TerminalIcon, Shield, Cpu, Code, Eye, RefreshCw } from "lucide-react";

interface Operator {
  id: string;
  code: string;
  name: string;
  role: string;
  specializations: string[];
  icon: React.ComponentType<any>;
  logs: string[];
}

export default function NeuralOperators() {
  const theme = useScrollStore((s) => s.theme);
  const [selectedOp, setSelectedOp] = useState<string>("OP-01");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const operators: Operator[] = [
    {
      id: "OP-01",
      code: "OP-01 // SEMANTIC COMPILER",
      name: "Copywriter",
      role: "Semantic Synthesizer. Translates structural digital architecture into high-density editorial assets.",
      specializations: ["Context-window optimization", "Token compression heuristics", "Linguistic entropy modeling"],
      icon: Code,
      logs: [
        "[OP-01/SYS] INIT: Instantiating Semantic Pipeline v5.0.4.",
        "[OP-01/TXT] EVAL: Analyzing linguistic density. Target entropy: <4.2 bits/token.",
        "[OP-01/PRN] COMP: Pruning non-semantic business jargon. Removed 14 instances.",
        "[OP-01/OUT] EMIT: Premium editorial streams routed to active viewports.",
        "[OP-01/SYS] STATUS: Semantic vector aligned. System locked."
      ]
    },
    {
      id: "OP-02",
      code: "OP-02 // GRAPHICS ENGINE",
      name: "ThreeJS Architect",
      role: "Spatial Render Bounds Director. Maps 3D coordinates and vector assets directly into web-accessible GPU pipelines.",
      specializations: ["GLSL Fragment/Vertex Shaders", "Ray-marching optimization", "Parametric instance matrices"],
      icon: Cpu,
      logs: [
        "[OP-02/GL ] CONTEXT: WebGL2 initialized successfully. Vendor: WebKit/GPU.",
        "[OP-02/VBO] MAP: Instantiating Vertex Buffer Objects. 48,168 geometry indices loaded.",
        "[OP-02/GPU] COMP: Custom fragment shader compiled (148 instructions, 0 bottlenecks).",
        "[OP-02/MEM] STATS: Heap allocation stable at 42.8MB. Garbage collector cycles: ZERO.",
        "[OP-02/SYS] STATUS: Frame draw time stable at 1.42ms (69.4 FPS)."
      ]
    },
    {
      id: "OP-03",
      code: "OP-03 // DYNAMIC AUDITOR",
      name: "UX Auditor",
      role: "Interactive Usability Auditor. Monitors viewport mechanics, micro-interactions, and visual ergonomics in real-time.",
      specializations: ["Cumulative Layout Shift metrics", "Interaction latency profiling", "Spring-physics debugging"],
      icon: Shield,
      logs: [
        "[OP-03/SYS] MONITOR: Initializing scroll-state telemetry. Target frequency: 120Hz.",
        "[OP-03/CLS] AUDIT: Cumulative Layout Shift (CLS) = 0.000. Grid bounds verified.",
        "[OP-03/JNK] TRACE: Thread block detected (4.2ms delay in main loop during scroll stretch).",
        "[OP-03/FIX] EXEC: Applying CSS transform-translate3d hardware acceleration layer.",
        "[OP-03/SYS] STATUS: Viewport friction score: 99.8/100. Certified."
      ]
    },
    {
      id: "OP-04",
      code: "OP-04 // VISION HEURISTICS",
      name: "Inspirator",
      role: "Aesthetic Tension Planner & Generative Design Heuristics Director. Manages structural asymmetry and styling tokens.",
      specializations: ["Typographic scale calibration", "Mathematical contrast auditing", "Display-P3 color spaces"],
      icon: Eye,
      logs: [
        "[OP-04/SYS] CONFIG: Active theme system: SOLAR FLARE. Contrast ratios evaluated.",
        "[OP-04/AST] SCALE: Type modular scale recalculated. Base: 10px, multiplier: 1.618.",
        "[OP-04/TNS] RATING: Aesthetic tension rating = 98.4%. Spatial balance optimal.",
        "[OP-04/EMT] DISPATCH: Dynamic CSS custom properties injected into root layout scope.",
        "[OP-04/SYS] STATUS: Visual coherence check: 100% match."
      ]
    }
  ];

  const currentOp = operators.find((op) => op.id === selectedOp) || operators[0];

  useEffect(() => {
    setTerminalLogs(currentOp.logs);
  }, [selectedOp]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  const triggerRecompile = () => {
    setIsCompiling(true);
    setTerminalLogs((prev) => [...prev, `[SYS/REBOOT] Re-evaluating ${selectedOp} node parameters...`]);
    
    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        `[SYS/OK] Re-compilation successful.`,
        `[${selectedOp}/METRIC] Latency profile optimized. Drift: 0.00ms.`
      ]);
      setIsCompiling(false);
    }, 1200);
  };

  // Dynamic colors based on active theme
  let cardClass = "bg-white text-neutral-900 border-2 border-black shadow-[6px_6px_0px_rgba(255,0,128,1)]";
  let activeBtn = "bg-black text-white border-black";
  let inactiveBtn = "bg-neutral-50 text-neutral-500 border-neutral-200 hover:border-black hover:text-black";
  let textSecondary = "text-neutral-500";
  let termBg = "bg-neutral-950 text-emerald-400";
  let borderAccent = "border-black";
  let headerText = "text-black";
  let tagClass = "bg-[#ccff00] text-black border border-black";
  
  if (theme === "cyber-dark") {
    cardClass = "bg-neutral-950 text-white border border-neutral-800 shadow-[6px_6px_0px_rgba(255,0,128,0.25)]";
    activeBtn = "bg-neutral-900 text-[#ccff00] border-[#ccff00] shadow-[2px_2px_0px_rgba(204,255,0,1)]";
    inactiveBtn = "bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-white hover:text-white";
    textSecondary = "text-neutral-400";
    termBg = "bg-black text-[#ccff00]";
    borderAccent = "border-neutral-800";
    headerText = "text-[#ccff00]";
    tagClass = "bg-[#ff0080]/15 text-[#ff0080] border border-[#ff0080]/30";
  } else if (theme === "mono") {
    cardClass = "bg-white text-neutral-900 border border-neutral-200 shadow-[6px_6px_0px_rgba(0,0,0,0.15)]";
    activeBtn = "bg-neutral-900 text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]";
    inactiveBtn = "bg-white text-neutral-500 border-neutral-200 hover:border-black hover:text-black";
    textSecondary = "text-neutral-500";
    termBg = "bg-neutral-950 text-neutral-200";
    borderAccent = "border-neutral-200";
    headerText = "text-neutral-900";
    tagClass = "bg-neutral-100 text-neutral-800 border border-neutral-300";
  } else if (theme === "solar") {
    cardClass = "bg-[#140b04] text-orange-50 border border-[#ff5500]/20 shadow-[6px_6px_0px_rgba(255,85,0,0.25)]";
    activeBtn = "bg-black text-[#ffcc00] border-[#ffcc00] shadow-[2px_2px_0px_rgba(255,204,0,1)]";
    inactiveBtn = "bg-[#1c0f05] text-orange-300/40 border-[#ff5500]/10 hover:border-white hover:text-orange-200";
    textSecondary = "text-orange-300/40";
    termBg = "bg-[#080301] text-orange-400";
    borderAccent = "border-[#ff5500]/20";
    headerText = "text-[#ffcc00]";
    tagClass = "bg-[#ff5500]/15 text-[#ffcc00] border border-[#ff5500]/30";
  }

  return (
    <div className={`w-full border-2 p-6 transition-all duration-300 ${cardClass}`}>
      {/* HUD Header */}
      <div className={`flex justify-between items-center border-b pb-4 mb-6 font-mono text-xs ${borderAccent}`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`${headerText} font-black uppercase tracking-wider`}>NEURAL_NETWORK_OPERATORS.CFG</span>
        </div>
        <span className="text-zinc-500 uppercase tracking-widest hidden sm:inline text-[9px]">COORDINATING SITE DEPLOYMENT</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Operator Selector Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
            SELECT ACTIVE NODE
          </div>
          
          <div className="flex flex-col gap-2">
            {operators.map((op) => {
              const Icon = op.icon;
              const isActive = selectedOp === op.id;
              return (
                <button
                  key={op.id}
                  onClick={() => setSelectedOp(op.id)}
                  className={`flex items-center gap-4 p-4 border-2 font-mono text-left transition-all cursor-pointer interactive ${
                    isActive ? activeBtn : inactiveBtn
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <span className="text-[8px] block font-black uppercase tracking-widest leading-none mb-1 opacity-60">
                      {op.id} NODE
                    </span>
                    <h4 className="text-xs font-black uppercase tracking-tight truncate leading-none">
                      {op.name}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Role & Specs Details */}
          <div className={`p-4 border font-mono text-xs mt-6 space-y-3 ${borderAccent}`}>
            <span className={`text-[8px] font-black uppercase px-2 py-0.5 ${tagClass}`}>
              Operator Specs
            </span>
            <p className={textSecondary}>{currentOp.role}</p>
            
            <div className="space-y-1.5 pt-2">
              <span className="text-[9px] text-zinc-500 uppercase block font-bold">Specializations:</span>
              <div className="flex flex-wrap gap-1">
                {currentOp.specializations.map((spec, idx) => (
                  <span key={idx} className="bg-neutral-800/10 text-neutral-500 text-[8px] px-1.5 py-0.5 font-semibold">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Console/Terminal */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="flex flex-col h-full min-h-[300px] font-mono text-[10px] overflow-hidden border border-black/10">
            {/* Terminal Header */}
            <div className="bg-neutral-900 border-b border-neutral-800 text-zinc-400 px-4 py-2 flex justify-between items-center select-none">
              <div className="flex items-center gap-2">
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>TERMINAL://{selectedOp}_STREAM.log</span>
              </div>
              <button 
                onClick={triggerRecompile}
                disabled={isCompiling}
                className="hover:text-white transition-colors cursor-pointer interactive flex items-center gap-1.5 text-[9px] font-bold"
              >
                <RefreshCw className={`w-3 h-3 ${isCompiling ? 'animate-spin' : ''}`} />
                RECOMPILE NODE
              </button>
            </div>

            {/* Terminal Logs View */}
            <div className={`p-4 h-full flex-grow overflow-y-auto font-mono flex flex-col gap-1.5 leading-relaxed ${termBg}`}>
              {terminalLogs.map((log, index) => {
                let colorClass = "text-zinc-400";
                if (log.includes("[SYS/OK]") || log.includes("STATUS:")) {
                  colorClass = theme === "solar" ? "text-[#ffcc00]" : theme === "mono" ? "text-neutral-300 font-bold" : "text-[#ccff00]";
                } else if (log.includes("INIT:") || log.includes("CONTEXT:")) {
                  colorClass = theme === "cyber-dark" ? "text-pink-400" : "text-sky-400";
                } else if (log.includes("PRN:") || log.includes("COMP:") || log.includes("EVAL:")) {
                  colorClass = "text-amber-400";
                }
                
                return (
                  <div key={index} className={`${colorClass} whitespace-pre-wrap`}>
                    {log}
                  </div>
                );
              })}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
