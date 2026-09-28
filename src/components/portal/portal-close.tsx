"use client";

import Link from "next/link";

export function PortalClose() {
  return (
    <section className="relative overflow-hidden bg-[#F0F7FD]/60 pt-28 border-t border-[rgba(56, 189, 248, 0.15)]">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-16 lg:px-24">
        {/* Top Split: Headline & Fine Print vs. Buttons */}
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
          {/* Left: Headline & Fine Print */}
          <div className="max-w-[48ch]">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9794A]" />
              <span className="font-sora text-[10.5px] uppercase tracking-[0.16em] text-[#475569]">
                05 // SOVEREIGN CLOSING
              </span>
            </div>
            <h2 className="font-syne text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold leading-[1.08] tracking-[-0.025em] text-[#0B1320]">
              Ready to claim sovereign architectural ownership?
            </h2>
            <p className="mt-6 font-sora text-[13px] leading-relaxed text-[#475569]">
              14–21 day deterministic production milestones. Sub-45ms execution latency. Full intellectual property and repository rights transferred on day one.
            </p>
          </div>

          {/* Right: Dual Buttons at Opposite Edge */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/start"
              className="group inline-flex items-center justify-center rounded-[4px] border border-[#0284C7] bg-[#0284C7] px-7 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-[#C15F3C] hover:shadow-[0_4px_20px_rgba(2, 132, 199,0.25)]"
            >
              START ENGAGEMENT
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-[4px] border border-[rgba(26,25,22,0.14)] bg-white px-7 py-3.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-[#0B1320] transition-colors hover:border-[#0284C7] hover:text-[#0284C7] shadow-sm"
            >
              EXPLORE CASE ARCHIVE
            </Link>
          </div>
        </div>

        {/* Hairline Footer Strip */}
        <div className="mt-24 border-t border-[rgba(56, 189, 248, 0.15)] py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-mono text-[10.5px] uppercase tracking-[0.15em] text-[#94A3B8]">
          <div className="flex items-center gap-6">
            <span>© 2026 VISTAR WEB SYSTEMS</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex items-center gap-6 text-[#475569]">
            <span>BERLIN</span>
            <span className="text-[#FF7A00]">·</span>
            <span>TOKYO</span>
            <span className="text-[#0284C7]">·</span>
            <span>SAN FRANCISCO</span>
          </div>
        </div>
      </div>

      {/* Signature Move: Giant Cropped Wordmark Translated Down */}
      <div className="pointer-events-none relative w-full overflow-hidden select-none translate-y-[24%]">
        <div className="text-center font-syne font-extrabold leading-none tracking-[-0.04em] text-[clamp(8rem,24vw,28rem)] text-[#0B1320] opacity-[0.05]">
          VISTAR
        </div>
      </div>
    </section>
  );
}
