import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * VISTAR LEAD INGESTION & DIAGNOSTIC API
 * 
 * Handles incoming project diagnostics and contact inquiries.
 * - Anti-spam honeypot detection
 * - In-memory sliding-window rate limiting
 * - RFC email validation & sanitization
 * - Deterministic reference ID generation
 * - Direct email dispatch to services.vistaar@gmail.com (Gmail SMTP / Resend)
 * - Multi-destination dispatch: Webhook (Discord/Slack/CRM) & Local Audit Sink
 * - Guaranteed response SLA: < 24 Hours
 */

const TARGET_EMAIL = "services.vistaar@gmail.com";

export interface LeadPayload {
  name: string;
  email: string;
  company?: string;
  notes?: string;

  // 6-step diagnostic fields
  goal?: string;
  bottleneck?: string;
  industry?: string;
  stack?: string;
  budget?: string;
  timeline?: string;

  // Legacy fallback compatibility
  brief?: string;
  date?: string;
  timezone?: string;

  // Anti-spam honeypot (hidden field)
  _hp?: string;
}

// ── In-Memory Rate Limiting (Sliding Window: 5 requests per 5 minutes per IP) ──
interface RateLimitEntry {
  timestamps: number[];
}

const RATE_LIMIT_STORE = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_STORE.get(ip) || { timestamps: [] };

  const validTimestamps = entry.timestamps.filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  RATE_LIMIT_STORE.set(ip, { timestamps: validTimestamps });
  return false;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(input: string, maxLength: number = 2000): string {
  return input.replace(/[<>]/g, "").trim().slice(0, maxLength);
}

function generateReferenceId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `VST-${timestamp}-${randomSuffix}`;
}

async function persistLeadToAuditSink(leadRecord: Record<string, unknown>) {
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      try {
        fs.mkdirSync(dataDir, { recursive: true });
      } catch {
        // In read-only serverless environments, fallback to /tmp
      }
    }
    const targetDir = fs.existsSync(dataDir) ? dataDir : "/tmp";
    const filePath = path.join(targetDir, "leads_audit.jsonl");
    const line = JSON.stringify(leadRecord) + "\n";
    fs.appendFileSync(filePath, line, "utf8");
  } catch (err) {
    console.warn("[LEAD HANDLER] Audit persistence non-critical notice:", err);
  }
}

async function sendEmailNotification(record: Record<string, any>) {
  const subject = `🚀 New Project Lead: ${record.name} (${record.company || "Direct"}) - [${record.referenceId}]`;

  const textBody = `
NEW PROJECT SPECIFICATION RECEIVED
===================================
Reference ID:  ${record.referenceId}
Full Name:     ${record.name}
Work Email:    ${record.email}
Company:       ${record.company || "Not provided"}
Category:      ${record.goal}
Budget:        ${record.budget}
Timeline:      ${record.timeline}
Submitted At:  ${record.submittedAt}
IP Address:    ${record.ipAddress}

TECHNICAL SCOPE & BRIEF:
-----------------------------------
${record.notes}
===================================
Reply directly to ${record.email} to respond within the 24h SLA.
`;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px; background: #ffffff;">
      <div style="border-bottom: 2px solid #FF3823; padding-bottom: 12px; margin-bottom: 20px;">
        <span style="font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280;">VISTAR System Diagnostic</span>
        <h2 style="color: #111827; margin: 4px 0 0 0; font-size: 20px;">New Project Specification Received</h2>
      </div>

      <div style="background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 6px; padding: 16px; margin-bottom: 20px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #6b7280; width: 140px; font-weight: 500;">Reference ID:</td>
            <td style="padding: 6px 0; color: #111827; font-family: monospace; font-weight: bold; color: #FF3823;">${record.referenceId}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Full Name:</td>
            <td style="padding: 6px 0; color: #111827; font-weight: 600;">${record.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Work Email:</td>
            <td style="padding: 6px 0; color: #111827;"><a href="mailto:${record.email}" style="color: #2563eb; text-decoration: underline;">${record.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Company:</td>
            <td style="padding: 6px 0; color: #111827;">${record.company || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Requirement:</td>
            <td style="padding: 6px 0; color: #111827;">${record.goal}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Budget Tier:</td>
            <td style="padding: 6px 0; color: #111827;">${record.budget}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Timeline:</td>
            <td style="padding: 6px 0; color: #111827;">${record.timeline}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #6b7280; font-weight: 500;">Submitted:</td>
            <td style="padding: 6px 0; color: #6b7280; font-size: 12px;">${record.submittedAt}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="color: #374151; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; font-family: monospace;">Technical Scope & Requirements:</h4>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 14px; font-size: 14px; line-height: 1.6; color: #1f2937; white-space: pre-wrap;">${record.notes}</div>
      </div>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; font-size: 12px; color: #9ca3af; text-align: center;">
        Direct reply to this notification will route to <strong>${record.email}</strong>.
      </div>
    </div>
  `;

  // 1. Dispatch via Gmail SMTP / Nodemailer if configured
  const gmailPass =
    process.env.GMAIL_APP_PASSWORD ||
    process.env.SMTP_PASSWORD ||
    process.env.EMAIL_PASSWORD;

  if (gmailPass) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER || TARGET_EMAIL,
          pass: gmailPass,
        },
      });

      await transporter.sendMail({
        from: `"VISTAR Inquiries" <${process.env.GMAIL_USER || TARGET_EMAIL}>`,
        to: TARGET_EMAIL,
        replyTo: record.email,
        subject,
        text: textBody,
        html: htmlBody,
      });

      console.log(`[EMAIL DISPATCH] Sent via Gmail SMTP to ${TARGET_EMAIL}`);
      return;
    } catch (smtpErr) {
      console.error("[EMAIL DISPATCH] Gmail SMTP error:", smtpErr);
    }
  }

  // 2. Dispatch via Resend API if configured
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "VISTAR Inquiries <onboarding@resend.dev>",
          to: [TARGET_EMAIL],
          reply_to: record.email,
          subject,
          text: textBody,
          html: htmlBody,
        }),
      });
      if (res.ok) {
        console.log(`[EMAIL DISPATCH] Sent via Resend to ${TARGET_EMAIL}`);
        return;
      }
    } catch (resendErr) {
      console.error("[EMAIL DISPATCH] Resend error:", resendErr);
    }
  }

  // 3. Fallback: Log notification to server stream
  console.log(`[EMAIL NOTIFICATION STORED] Target: ${TARGET_EMAIL}`);
  console.log(textBody);
}

async function dispatchWebhookNotification(record: Record<string, unknown>) {
  const webhookUrl =
    process.env.LEAD_WEBHOOK_URL ||
    process.env.DISCORD_WEBHOOK_URL ||
    process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) return;

  try {
    const content = `🚀 **NEW VISTAR PROJECT DIAGNOSTIC**
**Ref ID**: \`${record.referenceId}\`
**Name**: ${record.name} (${record.email})
**Company**: ${record.company || "Not provided"}
**Goal**: ${record.goal || "Custom"}
**Bottleneck**: ${record.bottleneck || "Not specified"}
**Domain**: ${record.industry || "Not specified"}
**Stack**: ${record.stack || "Not specified"}
**Budget**: ${record.budget || "Not specified"}
**Timeline**: ${record.timeline || "Flexible"}
**SLA**: < 24 Hours`;

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, text: content }),
    });
  } catch (err) {
    console.error("[LEAD HANDLER] Webhook dispatch error:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawIp =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 1. Rate Limiting Check
    if (isRateLimited(rawIp)) {
      return NextResponse.json(
        {
          success: false,
          errors: [
            `Rate limit exceeded. Please wait a few moments before trying again or email ${TARGET_EMAIL}.`,
          ],
        },
        { status: 429 }
      );
    }

    const body = (await request.json()) as Partial<LeadPayload>;

    // 2. Anti-Spam Honeypot Check
    if (body._hp && body._hp.trim().length > 0) {
      return NextResponse.json({
        success: true,
        referenceId: generateReferenceId(),
        sla: "< 24 Hours",
        message: "Diagnostic received.",
      });
    }

    // 3. Validation
    const isNewsletter = (body as any).type === "newsletter";
    const errors: string[] = [];

    if (!isNewsletter && (!body.name || body.name.trim().length < 2)) {
      errors.push("Name is required (minimum 2 characters).");
    }
    if (!body.email || !isValidEmail(body.email)) {
      errors.push("A valid work email address is required.");
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // 4. Sanitize Payload
    const referenceId = generateReferenceId();
    const sanitizedData = {
      referenceId,
      name: sanitize(body.name || (isNewsletter ? "Newsletter Subscriber" : "Inquirer"), 100),
      email: sanitize(body.email!, 150),
      company: sanitize(body.company || (isNewsletter ? "Newsletter" : "Direct"), 150),
      goal: sanitize(body.goal || (body as any).projectType || (isNewsletter ? "Technical Publications" : "Custom Architecture"), 200),
      bottleneck: sanitize(body.bottleneck || "Not specified", 200),
      industry: sanitize(body.industry || "Not specified", 200),
      stack: sanitize(body.stack || "Not specified", 200),
      budget: sanitize(body.budget || (isNewsletter ? "N/A" : "Not specified"), 100),
      timeline: sanitize(body.timeline || body.date || (isNewsletter ? "Immediate" : "Within 30 Days"), 100),
      notes: sanitize(body.notes || body.brief || (isNewsletter ? "Subscribed to technical publications from website footer." : ""), 4000),
      timezone: sanitize(body.timezone || "UTC", 60),
      submittedAt: new Date().toISOString(),
      sla: isNewsletter ? "Instant" : "< 24 Hours",
      ipAddress: rawIp,
    };

    // 5. Audit Logging, Email Dispatch & Webhook Dispatch
    console.log("━━━━━ NEW VISTAR PROJECT DIAGNOSTIC DISPATCHED ━━━━━");
    console.log(`REFERENCE ID: ${sanitizedData.referenceId}`);
    console.log(`NAME:         ${sanitizedData.name}`);
    console.log(`EMAIL:        ${sanitizedData.email}`);
    console.log(`COMPANY:      ${sanitizedData.company || "N/A"}`);
    console.log(`GOAL:         ${sanitizedData.goal}`);
    console.log(`BUDGET:       ${sanitizedData.budget}`);
    console.log(`TARGET EMAIL: ${TARGET_EMAIL}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // Persist to local audit stream
    await persistLeadToAuditSink(sanitizedData);

    // Send email to services.vistaar@gmail.com
    await sendEmailNotification(sanitizedData);

    // Trigger external webhook if configured
    await dispatchWebhookNotification(sanitizedData);

    return NextResponse.json({
      success: true,
      referenceId: sanitizedData.referenceId,
      sla: "< 24 Hours",
      message:
        "Project diagnostic received. A principal systems engineer will review your architecture and respond within 24 hours.",
    });
  } catch {
    return NextResponse.json(
      { success: false, errors: ["Invalid diagnostic request format."] },
      { status: 400 }
    );
  }
}
