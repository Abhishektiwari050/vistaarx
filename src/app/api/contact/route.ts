import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form API route — validates and processes incoming inquiries.
 * Ready for integration with email providers (Resend, SendGrid, etc.)
 */

interface ContactPayload {
  name: string;
  email: string;
  brief: string;
  budget: string;
  date: string;
  timezone: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(input: string): string {
  return input.replace(/[<>]/g, "").trim().slice(0, 2000);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;

    // ── Validate required fields ────────────────────────────────────
    const errors: string[] = [];

    if (!body.name || body.name.trim().length < 2) {
      errors.push("Name is required (min 2 characters).");
    }
    if (!body.email || !isValidEmail(body.email)) {
      errors.push("A valid email address is required.");
    }
    if (!body.brief || body.brief.trim().length < 10) {
      errors.push("Project brief is required (min 10 characters).");
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // ── Sanitize all inputs ─────────────────────────────────────────
    const sanitized: ContactPayload = {
      name: sanitize(body.name!),
      email: sanitize(body.email!),
      brief: sanitize(body.brief!),
      budget: sanitize(body.budget || "Not specified"),
      date: sanitize(body.date || "Not selected"),
      timezone: sanitize(body.timezone || "Not specified"),
    };

    // ── Log the submission (replace with email service integration) ─
    console.log("━━━━ NEW CONTACT SUBMISSION ━━━━");
    console.log(`Name:     ${sanitized.name}`);
    console.log(`Email:    ${sanitized.email}`);
    console.log(`Brief:    ${sanitized.brief}`);
    console.log(`Budget:   ${sanitized.budget}`);
    console.log(`Date:     ${sanitized.date}`);
    console.log(`Timezone: ${sanitized.timezone}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // TODO: Integrate with email provider
    // Example with Resend:
    // await resend.emails.send({
    //   from: "Vistar Studio <noreply@vistar.tech>",
    //   to: "hello@vistar.tech",
    //   subject: `New Inquiry: ${sanitized.name}`,
    //   text: `Name: ${sanitized.name}\nEmail: ${sanitized.email}\nBrief: ${sanitized.brief}\nBudget: ${sanitized.budget}`,
    // });

    return NextResponse.json({
      success: true,
      message: "Inquiry received. We'll respond within 24 hours.",
    });
  } catch {
    return NextResponse.json(
      { success: false, errors: ["Invalid request format."] },
      { status: 400 }
    );
  }
}
