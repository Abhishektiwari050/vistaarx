import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, projectType, budget, timeline, message } = body;

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email notification (you can integrate with services like SendGrid, Resend, etc.)
    const emailData = {
      to: 'hello@vistar.studio',
      from: email,
      subject: `[VISTAR SIGNAL] New Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Company: ${company || 'N/A'}
        Project Type: ${projectType}
        Budget: ${budget || 'N/A'}
        Timeline: ${timeline || 'N/A'}
        Message: ${message}
      `,
    };

    // Log the submission (replace with actual email service)
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission:', emailData);
    }

    return NextResponse.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact form error:', errorMessage);
    }
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
