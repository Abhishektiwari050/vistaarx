"use client";

import { useState, useMemo } from "react";
import { useThemeStyles } from "@/lib/hooks/use-theme-styles";
import { TiltCard } from "@/components/3d/tilt-card";
import { ThemeOverlay } from "@/components/theme-overlay";
import { 
  ManhwaNarrationBanner as ManhwaCaptionBox, 
  ComicMaskReveal
} from "@/components/manhwa/manhwa-panel";

// ── Dynamic date generation (next 5 weekdays from today) ────────────
function getUpcomingDates(): { day: number; label: string; month: string; status: "OPEN" | "LOCKED" }[] {
  const result: { day: number; label: string; month: string; status: "OPEN" | "LOCKED" }[] = [];
  const now = new Date();
  const cursor = new Date(now);
  cursor.setDate(cursor.getDate() + 2); // Start from day-after-tomorrow

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const sessions = ["Strategy Sync", "Architecture Audit", "Technical Review", "Director Brief", "Node Review"];

  let count = 0;
  while (result.length < 5) {
    const dayOfWeek = cursor.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const monthStr = months[cursor.getMonth()];
      const dayNum = cursor.getDate();
      result.push({
        day: dayNum,
        label: `${monthStr} ${dayNum} (${sessions[count % sessions.length]})`,
        month: monthStr,
        status: count === 3 ? "LOCKED" : "OPEN",
      });
      count++;
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
}

export default function ContactPage() {
  const { theme, glassCard: cardClass } = useThemeStyles();

  // ── Intake brief steps ──────────────────────────────────────────
  const [step, setStep] = useState(1);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [missionSpecs, setMissionSpecs] = useState("");
  const [targetBudget, setTargetBudget] = useState("$15,000 – $25,000 (Creative WebGL Landing)");
  const [activeDate, setActiveDate] = useState<number | null>(null);
  const [selectedTimezone, setSelectedTimezone] = useState("EST (UTC-5)");
  const [statusText, setStatusText] = useState("AWAITING OPERATOR CONNECTION...");
  const [isLocked, setIsLocked] = useState(false);

  const dates = useMemo(() => getUpcomingDates(), []);

  // ── Theme-specific styles ─────────────────────────────────────
  const textPrimary = {
    "cyber-light": "text-neutral-900",
    "cyber-dark": "text-white",
    mono: "text-neutral-900",
    solar: "text-[#fff5eb]",
  }[theme];

  const textSecondary = {
    "cyber-light": "text-[#ff0080] font-extrabold",
    "cyber-dark": "text-neutral-300 font-extrabold",
    mono: "text-neutral-600 font-extrabold",
    solar: "text-[#ffaa77] font-extrabold",
  }[theme];

  const inputClass = {
    "cyber-light": "w-full p-4 font-comic font-bold text-xs border-[3px] border-black bg-white text-black focus:outline-none focus:bg-neutral-50 focus:shadow-[4px_4px_0px_0px_#ff0080] transition-all rounded-xl",
    "cyber-dark": "w-full p-4 font-comic font-bold text-xs border-[3px] border-black bg-black text-white focus:outline-none focus:bg-neutral-950 focus:shadow-[4px_4px_0px_0px_#ff0080] transition-all rounded-xl",
    mono: "w-full p-4 font-comic font-bold text-xs border-[3px] border-black bg-white text-black focus:outline-none focus:bg-neutral-50 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all rounded-xl",
    solar: "w-full p-4 font-comic font-bold text-xs border-[3px] border-[#100501] bg-white text-black focus:outline-none focus:bg-[#fbf5e6] focus:shadow-[4px_4px_0px_0px_#ff5500] transition-all rounded-xl",
  }[theme];

  const activeSlotClass = {
    "cyber-light": "border-[3px] border-black bg-[#ccff00] text-black shadow-[3px_3px_0px_#000] rounded-xl",
    "cyber-dark": "border-[3px] border-[#ff0080] bg-[#ff0080] text-white shadow-[3px_3px_0px_#ff0080] rounded-xl",
    mono: "border-[3px] border-black bg-black text-white shadow-[3px_3px_0px_#000] rounded-xl",
    solar: "border-[3px] border-[#100501] bg-[#ffcc00] text-black shadow-[3px_3px_0px_#ff5500] rounded-xl",
  }[theme];

  const hoverSlotClass = {
    "cyber-light": "border-[3px] border-black bg-white text-neutral-800 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all rounded-xl cursor-pointer",
    "cyber-dark": "border-[3px] border-black bg-black text-white shadow-[3px_3px_0px_#ff0080] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#ff0080] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all rounded-xl cursor-pointer",
    mono: "border-[3px] border-black bg-white text-neutral-800 shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all rounded-xl cursor-pointer",
    solar: "border-[3px] border-[#100501] bg-white text-[#100501] shadow-[3px_3px_0px_#ff5500] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#ff5500] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all rounded-xl cursor-pointer",
  }[theme];

  const lockedSlotClass = {
    "cyber-light": "border-neutral-200 bg-neutral-100/50 text-neutral-400 cursor-not-allowed",
    "cyber-dark": "border-zinc-800 bg-neutral-900/40 text-zinc-600 cursor-not-allowed",
    mono: "border-neutral-200 bg-neutral-50 text-neutral-300 cursor-not-allowed",
    solar: "border-neutral-800 bg-neutral-900/20 text-orange-900 cursor-not-allowed",
  }[theme];

  const lockBtnClass = {
    "cyber-light": "bg-black text-white hover:bg-[#ff0080] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer",
    "cyber-dark": "bg-[#ff0080] text-white hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer",
    mono: "bg-black text-white hover:bg-neutral-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer",
    solar: "bg-white text-black hover:border-[#ffcc00] hover:bg-[#ffcc00] shadow-[4px_4px_0px_0px_#ff5500] hover:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer",
  }[theme];

  const stepActiveClass = theme === "cyber-dark"
    ? "border-[#ff0080] text-[#ff0080] bg-black font-bangers tracking-wider text-base"
    : "border-black bg-black text-white font-bangers tracking-wider text-base";

  // ── Form submission ───────────────────────────────────────────
  const handleLockSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !activeDate) return;
    setIsLocked(true);
    setStatusText("TRANSMITTING COORDINATES TO VISTAR LABS...");

    try {
      const selectedDate = dates.find((d) => d.day === activeDate);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          brief: missionSpecs,
          budget: targetBudget,
          date: selectedDate?.label ?? "Not selected",
          timezone: selectedTimezone,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatusText("✔ STAGE 1: SYSTEM PARAMETERS COMPILED.");
        setTimeout(() => {
          setStatusText(`✔ STAGE 2: SESSION INTAKE RESERVED FOR ${selectedTimezone}.`);
        }, 800);
        setTimeout(() => {
          setStatusText("🚀 SUCCESS! STRATEGY CALL BOOKED. hello@vistar.tech DESPATCHED.");
        }, 1600);
      } else {
        setStatusText(`⚠ ${data.errors?.[0] ?? "SUBMISSION FAILED. TRY AGAIN."}`);
        setIsLocked(false);
      }
    } catch {
      setStatusText("⚠ NETWORK ERROR. PLEASE TRY AGAIN.");
      setIsLocked(false);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && (!clientName || !clientEmail)) {
      setStatusText("⚠ FIELD VERIFICATION FAILURE: PROVIDE IDENTITY PARAMETERS.");
      return;
    }
    if (step === 2 && !missionSpecs) {
      setStatusText("⚠ FIELD VERIFICATION FAILURE: DEFINE PROJECT SPECIFICATIONS.");
      return;
    }
    setStep((prev) => prev + 1);
    if (step === 1) setStatusText("OPERATOR CONNECTED // DEFINE WORK SCOPE");
    else if (step === 2) setStatusText("COORDINATES VERIFIED // ASSIGN STRATEGY CALL SLOT");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full relative flex flex-col justify-center px-6 md:px-12 pt-12 pb-16 z-20 max-w-7xl mx-auto space-y-12">
      <ThemeOverlay />

      {/* Chapter header styled for calendar brief */}
      <div className="mb-2 mt-8 relative z-10 text-left select-none">
        <ComicMaskReveal delay={0.1} direction="bottom">
          <ManhwaCaptionBox 
            title="HQ INTEL INBOUND! COMPILE INTENSE SPECIFICATIONS!" 
            themeType="cyan"
            className="mb-4"
          />
        </ComicMaskReveal>
        <ComicMaskReveal delay={0.2} direction="bottom">
          <h1 
            className="font-bangers text-[3.8rem] md:text-[5.5rem] uppercase leading-none select-none text-black dark:text-white"
            style={{ WebkitTextStroke: "1.8px #000" }}
          >
            CONNECT HQ
          </h1>
        </ComicMaskReveal>
        <ComicMaskReveal delay={0.4} direction="right">
          <p className="font-comic text-xs sm:text-sm text-neutral-400 mt-4 max-w-md font-bold uppercase tracking-wider">
            Transmit your project coordinates below. Our system operator will respond within 24-hours SLA.
          </p>
        </ComicMaskReveal>
      </div>

      <div className="w-full my-auto z-10 flex flex-col space-y-8">

        {/* Step progress indicator */}
        <div className="w-full grid grid-cols-3 gap-2 font-bangers text-sm sm:text-base uppercase text-center max-w-2xl mx-auto select-none">
          <button
            type="button"
            disabled={isLocked}
            onClick={() => { setStep(1); setStatusText("Identity Section Active"); }}
            className={`py-3.5 border rounded-lg transition-all ${step >= 1 ? stepActiveClass : "border-zinc-200 text-zinc-400 bg-white/5"}`}
          >
            01 / Profile {step > 1 && "✔"}
          </button>
          <button
            type="button"
            disabled={step < 2 || isLocked}
            onClick={() => { setStep(2); setStatusText("Project Scope Active"); }}
            className={`py-3.5 border rounded-lg transition-all ${step >= 2 ? stepActiveClass : "border-zinc-200 text-zinc-400 bg-white/5"}`}
          >
            02 / Scope {step > 2 && "✔"}
          </button>
          <button
            type="button"
            disabled={step < 3 || isLocked}
            onClick={() => { setStep(3); setStatusText("Assign strategy session coordinate slot"); }}
            className={`py-3.5 border rounded-lg transition-all ${step >= 3 ? stepActiveClass : "border-zinc-200 text-zinc-400 bg-white/5"}`}
          >
            03 / Schedule {step > 3 && "✔"}
          </button>
        </div>

        <form
          onSubmit={handleLockSession}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-5xl mx-auto"
        >
          {/* LEFT PANEL: Multi-step intake brief */}
          <div className="lg:col-span-7 flex">
            <TiltCard intensity={3} className={`p-8 md:p-10 border ${cardClass} flex flex-col justify-between w-full h-full`}>
              <div className="space-y-6 w-full text-left">
                <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-[#ff0080]">
                  Inquiry / Step 0{step} of 03
                </span>

                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-2">
                      <h3 className={`font-bangers text-2xl uppercase tracking-wide ${textPrimary}`}>Profile Details</h3>
                      <p className="font-comic text-xs font-bold text-neutral-400 uppercase tracking-wide">Introduce yourself. Sincere communication pipelines start with identity.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-name" className="font-mono text-[8px] font-bold uppercase text-neutral-400 tracking-wider">Your Full Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          disabled={isLocked}
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Abhishek Tiwari"
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="contact-email" className="font-mono text-[8px] font-bold uppercase text-neutral-400 tracking-wider">Your Secure Email</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          disabled={isLocked}
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="e.g. hello@vistar.tech"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-2">
                      <h3 className={`font-bangers text-2xl uppercase tracking-wide ${textPrimary}`}>Mission Specs</h3>
                      <p className="font-comic text-xs font-bold text-neutral-400 uppercase tracking-wide">Define what we are building. Specify core visual and architectural targets.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-brief" className="font-mono text-[9px] font-black uppercase text-neutral-400">Project Brief & Details</label>
                        <textarea
                          id="contact-brief"
                          rows={4}
                          required
                          disabled={isLocked}
                          value={missionSpecs}
                          onChange={(e) => setMissionSpecs(e.target.value)}
                          placeholder="What high-performance interactive interfaces do you want us to construct?"
                          className={`${inputClass} resize-none`}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="contact-budget" className="font-mono text-[9px] font-black uppercase text-neutral-400">Target Budget Range</label>
                        <select
                          id="contact-budget"
                          disabled={isLocked}
                          value={targetBudget}
                          onChange={(e) => setTargetBudget(e.target.value)}
                          className={inputClass}
                        >
                          <option>$15,000 – $25,000 (Creative WebGL Landing)</option>
                          <option>$25,000 – $50,000 (Cinematic App + Core Stack)</option>
                          <option>$50,000+ (Full-Scale Custom Systems)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="space-y-2">
                      <h3 className={`font-bangers text-2xl uppercase tracking-wide ${textPrimary}`}>Direct Calendar Sync</h3>
                      <p className="font-comic text-xs font-bold text-neutral-400 uppercase tracking-wide">Select a secure session sync date coordinate on the scheduler to finalize.</p>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contact-timezone" className="font-mono text-[9px] font-black uppercase text-neutral-400">Timezone Operator</label>
                        <select
                          id="contact-timezone"
                          disabled={isLocked}
                          value={selectedTimezone}
                          onChange={(e) => setSelectedTimezone(e.target.value)}
                          className={inputClass}
                        >
                          <option>EST (UTC-5)</option>
                          <option>IST (UTC+5.5)</option>
                          <option>GMT (UTC+0)</option>
                          <option>PST (UTC-8)</option>
                          <option>AEST (UTC+10)</option>
                        </select>
                      </div>
                      <div className={`pt-2 p-4 border border-dashed ${theme === "cyber-dark" ? "border-zinc-700" : "border-neutral-300"} bg-neutral-500/5 font-mono text-[10px] space-y-1.5`}>
                        <p className="font-bold text-[#ff0080]">★ SYNC DETAILS CONSOLE:</p>
                        <p className={textSecondary}>Operator: Abhishek Tiwari (Founder & Chief Architect)</p>
                        <p className={textSecondary}>Intake: Strategy Audit & Low-latency Project Framing</p>
                        <p className={textSecondary}>Sync Platform: Google Meet secure channel</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step navigation */}
              <div className="pt-8 flex gap-4 w-full select-none pointer-events-auto interactive">
                {step > 1 && (
                  <button
                    type="button"
                    disabled={isLocked}
                    onClick={() => setStep((prev) => prev - 1)}
                    className={`px-5 py-4 border-2 font-bangers text-sm uppercase font-normal cursor-pointer hover:bg-neutral-50 ${
                      theme === "cyber-dark" ? "border-[#ff0080] text-white hover:bg-neutral-900" : "border-black text-black"
                    }`}
                  >
                    ← Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={`flex-grow py-4 text-center cursor-pointer border-2 font-bangers text-sm uppercase font-normal bg-black text-white hover:bg-[#ff0080] transition-colors ${
                      theme === "cyber-dark" ? "border-[#ff0080] bg-[#ff0080] hover:bg-white hover:text-black" : "border-black"
                    }`}
                  >
                    Continue to Scope →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!activeDate || !clientName || !clientEmail || isLocked}
                    className={`flex-grow py-4 font-bangers text-sm font-normal uppercase tracking-widest border-2 disabled:opacity-30 disabled:cursor-not-allowed ${lockBtnClass}`}
                  >
                    Book Strategy Call →
                  </button>
                )}
              </div>
            </TiltCard>
          </div>

          {/* RIGHT PANEL: Scheduler & Telemetry */}
          <div className="lg:col-span-5 flex">
            <TiltCard intensity={3} className={`p-8 md:p-10 border ${cardClass} flex flex-col justify-between w-full h-full`}>
              <div className="space-y-6 w-full flex-grow text-left">
                <div className={`flex justify-between items-center border-b ${theme === "cyber-dark" ? "border-white/5" : "border-neutral-200/50"} pb-3 font-mono text-[10px]`}>
                  <span className={`font-bold ${theme === "cyber-dark" ? "text-[#ff0080]" : "text-black"}`}>SCHEDULE COORDINATES</span>
                  <span className="text-zinc-500 font-mono text-[9px]">GMT+5:30</span>
                </div>

                <div className={`font-mono text-[9px] uppercase font-bold text-center border border-dashed ${theme === "cyber-dark" ? "border-zinc-800" : "border-neutral-200"} py-3 bg-neutral-500/5 rounded-lg`}>
                  <span className="text-[#ff0080] font-bold">{statusText}</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-[8px] font-bold uppercase text-neutral-400 tracking-wider">Available Sync Dates</label>
                    <span className="font-mono text-[8px] opacity-60">{selectedTimezone} Active</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 select-none pointer-events-auto interactive">
                    {dates.map((d, idx) => (
                      <button
                        key={idx}
                        type="button"
                        disabled={d.status === "LOCKED" || isLocked || step < 3}
                        onClick={() => {
                          setActiveDate(d.day);
                          setStatusText(`Selected Sync Date: ${d.label} in ${selectedTimezone}`);
                        }}
                        className={`py-3.5 border font-mono text-xs font-bold transition-all cursor-pointer text-center rounded-md ${
                          d.status === "LOCKED"
                            ? lockedSlotClass
                            : activeDate === d.day
                            ? activeSlotClass
                            : hoverSlotClass
                        }`}
                      >
                        {d.day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct contact channels */}
                <div className={`pt-6 border-t ${theme === "cyber-dark" ? "border-zinc-900" : "border-neutral-200"} space-y-3 font-sans text-xs`}>
                  <p className="font-mono text-[8px] font-bold uppercase text-neutral-400 tracking-wider">Direct Channel</p>
                  <p className={`font-comic text-xs font-extrabold leading-relaxed ${textSecondary}`}>
                    Bypass scheduling buffers and dispatch a direct brief to our team:{" "}
                    <a href="mailto:hello@vistar.tech" className="font-mono font-bold underline text-[#ff0080] interactive">hello@vistar.tech</a>
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>
        </form>
      </div>
    </div>
  );
}
