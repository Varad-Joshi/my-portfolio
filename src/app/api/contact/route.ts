import { NextRequest, NextResponse } from "next/server";
import { contact } from "../../../data/portfolio";

type ContactSubmission = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

const requestWindowMs = 15 * 60 * 1000;
const requestLimit = 5;
const requestsByClient = new Map<string, { count: number; expiresAt: number }>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readSubmission(value: unknown): ContactSubmission | null {
  if (!isRecord(value)) return null;

  const { name, email, subject, message, website } = value;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    (website !== undefined && typeof website !== "string")
  ) {
    return null;
  }

  return {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    website: typeof website === "string" ? website.trim() : "",
  };
}

function getValidationError(submission: ContactSubmission): string | null {
  if (submission.website) return "This submission could not be accepted.";
  if (submission.name.length < 2 || submission.name.length > 100) {
    return "Enter a name between 2 and 100 characters.";
  }
  if (
    submission.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)
  ) {
    return "Enter a valid email address.";
  }
  if (!submission.subject || submission.subject.length > 150) {
    return "Enter a subject of no more than 150 characters.";
  }
  if (!submission.message || submission.message.length > 5000) {
    return "Enter a message of no more than 5,000 characters.";
  }
  return null;
}

function checkRateLimit(clientKey: string, now: number) {
  for (const [key, value] of requestsByClient) {
    if (value.expiresAt <= now) requestsByClient.delete(key);
  }

  const current = requestsByClient.get(clientKey);
  if (!current || current.expiresAt <= now) {
    requestsByClient.set(clientKey, {
      count: 1,
      expiresAt: now + requestWindowMs,
    });
    return false;
  }

  if (current.count >= requestLimit) return true;
  current.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (checkRateLimit(clientKey, Date.now())) {
    return NextResponse.json(
      { error: "Too many messages were sent. Please wait a little before trying again." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(requestWindowMs / 1000)) },
      },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 12000) {
    return NextResponse.json(
      { error: "Your message is too large. Please shorten it and try again." },
      { status: 413 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Submit the form using valid JSON." }, { status: 400 });
  }

  const submission = readSubmission(payload);
  if (!submission) {
    return NextResponse.json(
      { error: "Complete all required fields with valid values." },
      { status: 400 },
    );
  }

  const validationError = getValidationError(submission);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "Email delivery is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const text = [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Subject: ${submission.subject}`,
    "",
    submission.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [contact.email],
        reply_to: submission.email,
        subject: `Portfolio contact: ${submission.subject}`,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "The email provider could not accept your message. Please try again later." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "The email service could not be reached. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
