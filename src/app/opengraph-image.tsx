import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VISTAR — Sovereign AI & Enterprise Software Engineering";
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
          padding: "64px 72px",
          backgroundColor: "#060709",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.12) 0%, transparent 50%)",
          color: "#ECEEF5",
          fontFamily: "system-ui, -apple-system, sans-serif",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#3B82F6",
                boxShadow: "0 0 16px #3B82F6",
              }}
            />
            <span
              style={{
                fontSize: "28px",
                fontWeight: "900",
                letterSpacing: "4px",
                color: "#FFFFFF",
              }}
            >
              VISTAR
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#959CB3",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10B981",
              }}
            />
            <span>16 GLOBAL EDGE POPs // LIVE</span>
          </div>
        </div>

        {/* Center Punchline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#3B82F6",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            The Underdog Engineering Cell
          </div>

          <div
            style={{
              fontSize: "56px",
              fontWeight: "800",
              lineHeight: "1.1",
              letterSpacing: "-1.5px",
              color: "#FFFFFF",
            }}
          >
            Autonomous AI Agents &amp; <br />
            Mission-Critical Software.
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#959CB3",
              maxWidth: "850px",
              lineHeight: "1.4",
            }}
          >
            100% private GitHub repository handover &bull; Zero vendor lock-in &bull; Delivered in 14-day production sprints.
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "14px",
            fontFamily: "monospace",
            color: "#959CB3",
          }}
        >
          <div style={{ display: "flex", gap: "32px" }}>
            <span>AEROSPACE GIS (VAYU)</span>
            <span>&bull;</span>
            <span>HEALTHCARE ANOMALY (AURA)</span>
            <span>&bull;</span>
            <span>SPATIAL 3D (3AXIS)</span>
          </div>

          <div style={{ color: "#FFFFFF", fontWeight: "700" }}>
            vistar.tech
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
