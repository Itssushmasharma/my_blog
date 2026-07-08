import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Required fields (name, email, message) are missing." },
        { status: 400 }
      );
    }

    // Mock processing - in a real app, integrate Resend, Sendgrid, or EmailJS here:
    // console.log("New contact message received:", { name, email, message });

    return NextResponse.json({ success: true, message: "Message processed successfully." });
  } catch {
    return NextResponse.json(
      { error: "An error occurred while routing your message request." },
      { status: 500 }
    );
  }
}
