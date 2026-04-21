import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const TO_EMAIL = "services.vistaar@gmail.com"

serve(async (req) => {
  try {
    const { record } = await req.json()
    const { name, email, company, goal } = record

    console.log(`🚀 [NEW LEAD]: ${name} is interested in ${goal}`)

    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "VistaarX Studio <onboarding@resend.dev>",
          to: [TO_EMAIL],
          subject: `🔥 New Strategy Session | ${name} | ${company || 'No Company'}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 4px solid black; padding: 20px; background-color: #f0f0f0;">
              <h1 style="background-color: #ccff00; color: black; padding: 10px; border: 2px solid black; text-transform: uppercase;">New Studio Inquiry!</h1>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company || 'N/A'}</p>
              <p><strong>Category:</strong> ${record.category || 'N/A'}</p>
              <p><strong>Goal:</strong> ${goal}</p>
              <hr style="border: 1px solid black;" />
              <p style="font-size: 12px; color: #666;">Sent via VistaarX Studio Automated Notification System</p>
            </div>
          `,
        }),
      })

      if (!res.ok) {
        const error = await res.text()
        console.error("❌ Resend error:", error)
      } else {
        console.log("✅ Notification email sent!")
      }
    } else {
      console.warn("⚠️ RESEND_API_KEY not found. Skipping email notification.")
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("❌ Notification error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
