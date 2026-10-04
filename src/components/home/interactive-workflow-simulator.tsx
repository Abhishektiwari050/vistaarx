"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Bell,
  Clock,
  Database,
  Send,
  Building,
  UserCheck,
  TrendingUp,
  RotateCw,
  Play,
  Pause,
  type LucideIcon,
} from "lucide-react";

interface WorkflowStep {
  id: number;
  label: string;
  sublabel: string;
  badge: string;
  icon: LucideIcon;
}

const STEPS: WorkflowStep[] = [
  {
    id: 1,
    label: "1. Enquiry Arrives",
    sublabel: "WhatsApp or Web Form",
    badge: "Intake",
    icon: MessageSquare,
  },
  {
    id: 2,
    label: "2. Automatic Triage",
    sublabel: "Details parsed & structured",
    badge: "Automation",
    icon: Database,
  },
  {
    id: 3,
    label: "3. Team Alert",
    sublabel: "Owner notified instantly",
    badge: "Routing",
    icon: Bell,
  },
  {
    id: 4,
    label: "4. Fast Follow-Up",
    sublabel: "Client receives confirmation",
    badge: "Response",
    icon: Send,
  },
  {
    id: 5,
    label: "5. Operational View",
    sublabel: "Logged to live dashboard",
    badge: "Visibility",
    icon: TrendingUp,
  },
];

export function InteractiveWorkflowSimulator() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance loop when playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev >= STEPS.length ? 1 : prev + 1));
    }, 4200);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="w-full bg-[#FAF9F6] border border-black/10 rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-[#121316]">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-black/8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Live Architecture Walkthrough
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#121316] mt-1">
            How a Vistar Workflow Solves the Enquiry Bottleneck
          </h3>
          <p className="text-sm text-neutral-600 mt-1 max-w-xl">
            Click any step to inspect how incoming enquiries turn into organized sales actions without manual copy-pasting.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-black/10 bg-white hover:bg-neutral-50 text-neutral-700 transition-colors shadow-2xs"
            aria-label={isPlaying ? "Pause automated workflow walkthrough" : "Resume automated workflow walkthrough"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-neutral-500" />
                <span>Pause Auto-Play</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-neutral-500" />
                <span>Auto Play</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Step Navigator (Tabs) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-6 pb-6">
        {STEPS.map((step) => {
          const isActive = activeStep === step.id;
          const isPassed = activeStep > step.id;
          const Icon = step.icon;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => {
                setActiveStep(step.id);
                setIsPlaying(false);
              }}
              className={`text-left p-3 rounded-xl border transition-all relative ${
                isActive
                  ? "bg-white border-[#E1341E] shadow-sm ring-1 ring-[#E1341E]/20"
                  : isPassed
                  ? "bg-neutral-50/80 border-black/8 hover:bg-white text-neutral-600"
                  : "bg-white/50 border-black/5 hover:bg-white text-neutral-500"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? "text-[#E1341E]"
                      : isPassed
                      ? "text-[#16A34A]"
                      : "text-neutral-400"
                  }`}
                />
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold ${
                    isActive
                      ? "bg-[#E1341E]/10 text-[#E1341E]"
                      : "bg-black/5 text-neutral-500"
                  }`}
                >
                  {step.badge}
                </span>
              </div>
              <div className="text-[12.5px] font-semibold text-[#121316] leading-tight">
                {step.label}
              </div>
              <div className="text-[11px] text-neutral-500 truncate mt-0.5">
                {step.sublabel}
              </div>

              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E1341E] rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Display */}
      <div className="bg-white border border-black/10 rounded-xl p-5 sm:p-7 transition-all">
        {activeStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Multi-Channel Ingestion</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-semibold text-[#121316]">
                An enquiry comes in from WhatsApp or your website
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Rather than messages sitting unnoticed in an individual sales rep’s private phone or lost in an unmonitored inbox, the system immediately captures every customer request into an audit record.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Works with official WhatsApp Business API &amp; web forms</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Captures contact details, enquiry type, volume, and notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Generates a traceable reference ID for both buyer and seller</span>
                </li>
              </ul>
            </div>

            {/* Visual Simulator Card */}
            <div className="bg-[#FAF9F6] border border-black/8 rounded-xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-black/6 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xs">
                    W
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-900">
                      WhatsApp Message Received
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono">
                      +91 98721 ••••• &bull; Just now
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-100 text-emerald-800 rounded font-semibold">
                  NEW LEAD
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-black/6 text-xs text-neutral-800 leading-relaxed font-sans shadow-2xs">
                &ldquo;Hello, we need a quote for 450 units of high-grade copper fittings delivered to our warehouse in Kanpur by next Tuesday. Can you share specs and pricing?&rdquo;
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500 pt-2 border-t border-black/6">
                <span>Channel: WhatsApp Business</span>
                <span className="text-[#E1341E] font-medium flex items-center gap-1">
                  Parsing payload &rarr;
                </span>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-medium">
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>Structured Information Extraction</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-semibold text-[#121316]">
                Key parameters are extracted and validated automatically
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                No more human re-typing into Excel. The system extracts product items, quantities, urgency, city, and company name into clean, queryable database fields ready for quoting.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Distinguishes product lines, volume requests, and delivery deadlines</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Checks if the client already exists in your historical account book</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Eliminates spelling mismatches and missing phone numbers</span>
                </li>
              </ul>
            </div>

            {/* Visual Simulator Card */}
            <div className="bg-[#FAF9F6] border border-black/8 rounded-xl p-4 sm:p-5 shadow-xs font-mono text-xs">
              <div className="flex items-center justify-between border-b border-black/6 pb-2.5 mb-3">
                <span className="text-neutral-500 font-semibold">PARSED ENQUIRY PAYLOAD</span>
                <span className="text-[#16A34A] font-bold">100% VALIDATED</span>
              </div>

              <div className="space-y-2 text-[11.5px]">
                <div className="flex justify-between py-1 border-b border-black/4">
                  <span className="text-neutral-500">Item Requested:</span>
                  <span className="text-neutral-900 font-medium">Copper Fittings (High-Grade)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/4">
                  <span className="text-neutral-500">Order Volume:</span>
                  <span className="text-neutral-900 font-medium">450 Units</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/4">
                  <span className="text-neutral-500">Destination:</span>
                  <span className="text-neutral-900 font-medium">Kanpur Logistics Park</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/4">
                  <span className="text-neutral-500">Required Date:</span>
                  <span className="text-[#E1341E] font-medium">Next Tuesday (Urgent)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">Account Status:</span>
                  <span className="text-[#16A34A] font-medium">New B2B Buyer</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium">
                <Bell className="w-3.5 h-3.5 text-amber-600" />
                <span>Instant Team Notification</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-semibold text-[#121316]">
                The right team member gets an actionable alert in 15 seconds
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Instead of waiting until someone checks an email batch at the end of the day, your sales manager or operations lead receives an actionable WhatsApp message or Slack ping with the full enquiry summary and 1-click reply.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Routed based on city, product category, or order value</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Includes 1-tap quote generation link</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Escalation reminders if no team member opens the ticket in 60 mins</span>
                </li>
              </ul>
            </div>

            {/* Visual Simulator Card */}
            <div className="bg-[#FAF9F6] border border-black/8 rounded-xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-black/6 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-semibold text-neutral-900">
                    Sales Lead Push Alert
                  </span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-100 text-amber-800 rounded font-semibold">
                  DISPATCHED
                </span>
              </div>

              <div className="bg-white p-3 rounded-lg border border-black/6 space-y-2 text-xs text-neutral-800 shadow-2xs">
                <div className="font-semibold text-neutral-900 flex items-center justify-between">
                  <span>🔔 High-Priority B2B Enquiry</span>
                  <span className="text-[10px] font-mono text-neutral-400">12:04 PM</span>
                </div>
                <p className="text-[11.5px] text-neutral-600">
                  New 450-unit quote requested for Kanpur by Acme Industrial. Estimated deal size: ₹1,80,000.
                </p>
                <div className="pt-2 flex gap-2">
                  <span className="inline-block px-2 py-1 bg-black text-white text-[11px] rounded font-medium">
                    Open Quote Builder
                  </span>
                  <span className="inline-block px-2 py-1 bg-neutral-100 text-neutral-700 text-[11px] rounded font-medium">
                    Assign to Rep
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-xs font-medium">
                <Send className="w-3.5 h-3.5 text-purple-600" />
                <span>Immediate Client Reassurance</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-semibold text-[#121316]">
                The buyer gets immediate confirmation and professional handling
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                In B2B, whoever responds first usually wins the order. While your team prepares the quote, the prospective buyer receives a branded, respectful message confirming receipt with their reference ID.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Provides direct reference code (e.g. VST-KN-450)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Shares catalog, terms, or brochure automatically</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Prevents buyers from searching for alternative competitors</span>
                </li>
              </ul>
            </div>

            {/* Visual Simulator Card */}
            <div className="bg-[#FAF9F6] border border-black/8 rounded-xl p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-black/6 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                  <span className="text-xs font-semibold text-neutral-900">
                    Automated Confirmation to Buyer
                  </span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-purple-100 text-purple-800 rounded font-semibold">
                  SENT &amp; DELIVERED
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-black/6 text-xs text-neutral-800 leading-relaxed space-y-2 shadow-2xs">
                <p>
                  &ldquo;Thank you for contacting us regarding 450 units of Copper Fittings. Reference code: <strong>#VST-KN-450</strong>.&rdquo;
                </p>
                <p className="text-neutral-600">
                  &ldquo;Our technical sales engineer, Rajesh, is preparing your official specification and price sheet. You will receive it shortly.&rdquo;
                </p>
              </div>
            </div>
          </div>
        )}

        {activeStep === 5 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Executive Visibility</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-semibold text-[#121316]">
                Everything logs to your company dashboard in real time
              </h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                As founder or manager, you never have to ask your team &ldquo;how many enquiries came in this week?&rdquo; Everything is visible on a single clean portal with conversion rates, pending follow-ups, and pipeline value.
              </p>
              <ul className="space-y-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Real-time sync to PostgreSQL, Google Sheets, or internal CRM</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Audit trail of response times and conversion metrics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Role-based access: staff see tasks, management sees margins</span>
                </li>
              </ul>
            </div>

            {/* Visual Simulator Card */}
            <div className="bg-[#FAF9F6] border border-black/8 rounded-xl p-4 sm:p-5 shadow-xs font-sans">
              <div className="flex items-center justify-between border-b border-black/6 pb-2.5 mb-3">
                <span className="text-xs font-semibold text-neutral-900">
                  Operations Overview &bull; Live
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
                  UPDATED 2S AGO
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="p-2.5 bg-white border border-black/6 rounded-lg">
                  <div className="text-[10px] text-neutral-500 uppercase font-mono">
                    Weekly Enquiries
                  </div>
                  <div className="text-lg font-bold text-neutral-900 mt-0.5">84 Leads</div>
                  <div className="text-[10px] text-emerald-600 font-medium">↑ 18% vs last week</div>
                </div>
                <div className="p-2.5 bg-white border border-black/6 rounded-lg">
                  <div className="text-[10px] text-neutral-500 uppercase font-mono">
                    Avg Response Time
                  </div>
                  <div className="text-lg font-bold text-neutral-900 mt-0.5">4.2 Mins</div>
                  <div className="text-[10px] text-emerald-600 font-medium">92% within 15m</div>
                </div>
              </div>

              <div className="p-2.5 bg-white border border-black/6 rounded-lg text-xs space-y-1">
                <div className="flex justify-between text-neutral-700 font-medium">
                  <span>#VST-KN-450 &bull; Copper Fittings</span>
                  <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-mono">
                    Quote In Progress
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 flex justify-between">
                  <span>Assigned to: Rajesh K.</span>
                  <span>Value: ₹1,80,000</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-5 pt-4 border-t border-black/6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E1341E]" />
          <span>Every system is customized to your exact team workflow and tools.</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/918860110144?text=Hi%20Abhishek%2C%20I%20saw%20the%20workflow%20simulator%20on%20Vistar%20and%20want%20to%20automate%20our%20enquiry%20process."
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-800 font-medium inline-flex items-center gap-1"
          >
            <span>Ask how this applies to your business &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default InteractiveWorkflowSimulator;
