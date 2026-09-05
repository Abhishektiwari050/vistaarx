import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vistar Web Systems — Custom Web Architecture & High-Performance Platforms";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#faf9f5",
          padding: "64px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          border: "16px solid #0a0a0a",
          position: "relative",
        }}
      >
        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              backgroundColor: "#ffffff",
              border: "3px solid #0a0a0a",
              padding: "10px 24px",
              borderRadius: "12px",
              boxShadow: "4px 4px 0px #ff1e90",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: "#d8ff42",
                border: "2px solid #0a0a0a",
              }}
            />
            <span
              style={{
                fontSize: "15px",
                fontWeight: 900,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#0a0a0a",
              }}
            >
              VISTAR WEB SYSTEMS
            </span>
          </div>

          <div
            style={{
              fontSize: "14px",
              fontWeight: 800,
              fontFamily: "monospace",
              color: "#71717a",
              letterSpacing: "2px",
            }}
          >
            PRODUCTION GRADE // 2026
          </div>
        </div>

        {/* Center Main Typography */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-2px",
              textTransform: "uppercase",
              color: "#0a0a0a",
            }}
          >
            Engineered for <br />
            market speed &amp; equity.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#52525b",
              lineHeight: 1.4,
              fontWeight: 500,
            }}
          >
            Custom Next.js platforms, WebGL graphics, sub-150ms edge rendering, and 100% codebase ownership.
          </div>
        </div>

        {/* Bottom Feature Metrics Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            width: "100%",
          }}
        >
          {[
            { label: "< 150ms TTFB", bg: "#d8ff42", color: "#000000" },
            { label: "98+ Lighthouse P95", bg: "#ffffff", color: "#000000" },
            { label: "0KB Plugin Bloat", bg: "#ffffff", color: "#000000" },
            { label: "100% Source Handover", bg: "#ff1e90", color: "#ffffff" },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: item.bg,
                color: item.color,
                border: "3px solid #0a0a0a",
                padding: "12px 20px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 900,
                letterSpacing: "1px",
                textTransform: "uppercase",
                boxShadow: "3px 3px 0px #0a0a0a",
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
