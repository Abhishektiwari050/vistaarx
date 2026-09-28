"use client";

interface RosterRow {
  tag: string;
  tagAccent: "amber" | "teal";
  name: string;
  count: string;
}

const ROSTER_ROWS: RosterRow[] = [
  {
    tag: "01 // AUTONOMOUS AI RUNTIME",
    tagAccent: "amber",
    name: "SOVEREIGN INFERENCE & WORKFLOWS",
    count: "4 DEPLOYMENTS",
  },
  {
    tag: "02 // AEROSPACE GIS & TELEMETRY",
    tagAccent: "teal",
    name: "AIRSPACE HAZARD DECODING & NOTAM NLP",
    count: "12 CLUSTERS",
  },
  {
    tag: "03 // TIME-SERIES ANOMALIES",
    tagAccent: "amber",
    name: "UNSUPERVISED ISOLATION FOREST STREAMS",
    count: "100K TPS",
  },
  {
    tag: "04 // SPATIAL ARCHITECTURE",
    tagAccent: "teal",
    name: "PERSPECTIVE SHIFTERS & HIGH-PERF SHADERS",
    count: "99/100 SPEED",
  },
];

interface DateRow {
  code: string;
  system: string;
  cluster: string;
  cadence: string;
  clearance: string;
}

const DATE_ROWS: DateRow[] = [
  {
    code: "VTR-001",
    system: "Project VAYU (AI Cockpit)",
    cluster: "US-WEST (OREGON)",
    cadence: "MARCH 2026",
    clearance: "ACTIVE // OPERATIONAL",
  },
  {
    code: "VTR-002",
    system: "AURA Anomaly System",
    cluster: "EU-CENTRAL (FRANKFURT)",
    cadence: "APRIL 2026",
    clearance: "CLEARANCE GRANTED",
  },
  {
    code: "VTR-003",
    system: "3axis Arc Real Estate",
    cluster: "GLOBAL EDGE (CLOUDFLARE)",
    cadence: "MAY 2026",
    clearance: "PRODUCTION VERIFIED",
  },
  {
    code: "VTR-004",
    system: "Sovereign Framework 2.0",
    cluster: "AP-NORTHEAST (TOKYO)",
    cadence: "Q3 2026",
    clearance: "SCHEDULED DISPATCH",
  },
];

export function RosterAndDates() {
  return (
    <section
      id="roster"
      className="relative min-h-screen w-full bg-transparent px-6 py-28 md:px-16 lg:px-24 border-t border-[rgba(56, 189, 248, 0.15)]"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0284C7]" />
            <p className="font-sora text-[11px] uppercase tracking-[0.16em] text-[#475569]">
              03 // CAPABILITY ROSTER & DISPATCH
            </p>
          </div>
          <span className="font-mono text-[10px] text-[#94A3B8] tracking-widest hidden sm:inline">
            ARCHITECTURAL INDEX
          </span>
        </div>

        {/* 1. Hairline Roster Rows */}
        <div className="border-b border-[rgba(56, 189, 248, 0.15)]">
          {ROSTER_ROWS.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between py-6 border-t border-[rgba(56, 189, 248, 0.15)] md:flex-row md:items-center transition-colors hover:bg-[#F0F7FD]/60 px-3 rounded-lg"
            >
              {/* Left: Small uppercase accent label */}
              <span
                className={`font-sora text-[10px] uppercase tracking-[0.16em] font-semibold ${
                  item.tagAccent === "amber" ? "text-[#FF7A00]" : "text-[#0284C7]"
                }`}
              >
                {item.tag}
              </span>

              {/* Center: Display-face name */}
              <h3 className="my-2 md:my-0 font-syne text-lg md:text-xl font-bold tracking-tight text-[#0B1320] group-hover:text-[#0284C7] transition-colors">
                {item.name}
              </h3>

              {/* Right: Right-aligned count/spec */}
              <span className="font-mono text-[11px] text-[#475569] tracking-widest text-right">
                [{item.count}]
              </span>
            </div>
          ))}
        </div>

        {/* 2. Dates Table Header */}
        <div id="dates" className="mt-28 mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF7A00]" />
            <p className="font-sora text-[11px] uppercase tracking-[0.16em] text-[#475569]">
              04 // DISPATCH SCHEDULE & RELEASES
            </p>
          </div>
          <span className="font-mono text-[10px] text-[#0284C7] font-semibold tracking-widest">
            STATUS: ACTIVE
          </span>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[rgba(56, 189, 248, 0.15)] pb-4">
                <th className="py-4 font-sora text-[10.5px] uppercase tracking-[0.16em] text-[#475569]">
                  RELEASE CODE
                </th>
                <th className="py-4 font-sora text-[10.5px] uppercase tracking-[0.16em] text-[#475569]">
                  SYSTEM ARCHITECTURE
                </th>
                <th className="py-4 font-sora text-[10.5px] uppercase tracking-[0.16em] text-[#475569]">
                  CLUSTER REGION
                </th>
                <th className="py-4 font-sora text-[10.5px] uppercase tracking-[0.16em] text-[#475569]">
                  DISPATCH CADENCE
                </th>
                <th className="py-4 text-right font-sora text-[10.5px] uppercase tracking-[0.16em] text-[#475569]">
                  CLEARANCE
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(56, 189, 248, 0.15)]">
              {DATE_ROWS.map((row) => (
                <tr
                  key={row.code}
                  className="group transition-colors hover:bg-[#F0F7FD]/60"
                >
                  {/* First Column: Display-face */}
                  <td className="py-5 font-syne text-[15px] font-bold tracking-tight text-[#FF7A00]">
                    {row.code}
                  </td>
                  <td className="py-5 font-syne text-[14px] font-medium text-[#0B1320] group-hover:text-[#0284C7] transition-colors">
                    {row.system}
                  </td>
                  <td className="py-5 font-sora text-[12px] text-[#475569]">
                    {row.cluster}
                  </td>
                  <td className="py-5 font-mono text-[11px] text-[#94A3B8]">
                    {row.cadence}
                  </td>
                  <td className="py-5 text-right font-sora text-[11px] uppercase tracking-[0.12em] text-[#0284C7] font-semibold">
                    {row.clearance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Collapsing to 2-column grid per row */}
        <div className="md:hidden space-y-4">
          {DATE_ROWS.map((row) => (
            <div
              key={row.code}
              className="rounded-lg border border-[rgba(56, 189, 248, 0.15)] bg-white shadow-sm p-5 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[rgba(56, 189, 248, 0.15)] pb-2">
                <span className="font-syne text-lg font-bold text-[#FF7A00]">
                  {row.code}
                </span>
                <span className="font-mono text-[10px] text-[#0284C7] font-semibold">
                  {row.clearance}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <span className="text-[#94A3B8]">SYSTEM:</span>
                <span className="text-[#0B1320] font-medium text-right">
                  {row.system}
                </span>
                <span className="text-[#94A3B8]">CLUSTER:</span>
                <span className="text-[#475569] text-right">{row.cluster}</span>
                <span className="text-[#94A3B8]">CADENCE:</span>
                <span className="font-mono text-[#475569] text-right">
                  {row.cadence}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
