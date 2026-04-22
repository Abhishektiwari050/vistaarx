import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const TO_EMAIL = "services.vistaar@gmail.com"

serve(async (req) => {
  try {
    const { record } = await req.json()
    const { name, email, company, goal, category } = record

    console.log(`🚀 [NEW LEAD]: "${name}" (${email}) is interested in ${category || 'N/A'} - ${goal || 'N/A'}`)

    if (RESEND_API_KEY) {
      console.log("📨 Attempting to dispatch email via Resend...")
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "VistaarX Studio <inquiry@nareogalua.resend.app>",
          to: [TO_EMAIL],
          subject: `🔥 New Strategy Session | ${name} | ${company || 'No Company'}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 4px solid black; padding: 20px; background-color: #f0f0f0;">
              <p style="background-color: #ccff00; color: black; padding: 10px; border: 2px solid black; text-transform: uppercase; font-weight: bold; margin-top: 0;">New Studio Inquiry Received</p>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Company:</strong> ${company || 'N/A'}</p>
              <p><strong>Category:</strong> ${category || 'N/A'}</p>
              <p><strong>Goal:</strong> ${goal || 'N/A'}</p>
              <hr style="border: 1px solid black; margin: 20px 0;" />
              <p style="font-size: 12px; color: #666;">This is an automated notification from VistaarX Cloud Platform.</p>
            </div>
          `,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        console.error("❌ Resend dispatch failed:", data)
      } else {
        console.log("✅ Notification email sent successfully! ID:", data.id)
      }
    } else {
      console.error("❌ CRITICAL: RESEND_API_KEY is not defined in environment variables.")
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
