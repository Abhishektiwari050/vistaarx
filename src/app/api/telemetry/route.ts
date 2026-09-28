import { NextRequest, NextResponse } from "next/server";

interface TelemetryEvent {
  event: string;
  path?: string;
  timestamp?: number;
  [key: string]: unknown;
}

// In-memory ring buffer of recent events for telemetry verification (max 100)
const RECENT_EVENTS: Array<TelemetryEvent & { receivedAt: string; ipHash: string }> = [];
const MAX_RING_BUFFER = 100;

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).slice(0, 8);
}

export async function POST(request: NextRequest) {
  try {
    const rawIp =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const ipHash = simpleHash(rawIp);
    const body = (await request.json()) as TelemetryEvent;

    if (!body || !body.event) {
      return NextResponse.json({ error: "Invalid telemetry event payload." }, { status: 400 });
    }

    const eventRecord = {
      ...body,
      receivedAt: new Date().toISOString(),
      ipHash,
    };

    // Store in ring buffer
    RECENT_EVENTS.unshift(eventRecord);
    if (RECENT_EVENTS.length > MAX_RING_BUFFER) {
      RECENT_EVENTS.pop();
    }

    // High-signal console logging for verification
    console.log(
      `[TELEMETRY] ${eventRecord.receivedAt} | EVENT: ${eventRecord.event} | PATH: ${eventRecord.path || "/"} | CLIENT: #${ipHash}`
    );

    return NextResponse.json({ success: true, count: RECENT_EVENTS.length }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Malformed event transmission." }, { status: 400 });
  }
}

// Optional GET endpoint to inspect telemetry stream in development
export async function GET() {
  return NextResponse.json({
    engine: "VISTAR_TELEMETRY_STREAM_V1",
    status: "ACTIVE",
    bufferedEvents: RECENT_EVENTS.slice(0, 25),
  });
}
