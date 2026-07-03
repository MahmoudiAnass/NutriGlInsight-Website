import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RequestSchema = z.object({
  name: z.string().max(200).optional().default(""),
  email: z.string().email().max(320),
  supportId: z.string().max(200).optional().default(""),
  reason: z.string().max(2000).optional().default(""),
  confirm: z.literal(true),
  company: z.string().max(0).optional().default(""), // honeypot must be empty
  locale: z.string().max(8).optional().default("en"),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot triggered or invalid input. Return 200 for bots so they get no signal.
    const honeypotHit =
      typeof (body as Record<string, unknown>)?.company === "string" &&
      ((body as Record<string, unknown>).company as string).length > 0;
    if (honeypotHit) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const { name, email, supportId, reason, locale } = parsed.data;

  const to = process.env.DELETE_REQUEST_TO ?? "contact@nutriglinsight.com";
  const from = process.env.DELETE_REQUEST_FROM ?? "NutriGL Insight <no-reply@nutriglinsight.com>";
  const apiKey = process.env.RESEND_API_KEY;

  const subject = `Data Deletion Request — ${email}`;
  const lines = [
    `New data deletion request from the NutriGL Insight website.`,
    ``,
    `Name: ${name || "—"}`,
    `Account email: ${email}`,
    `Support / Device ID: ${supportId || "—"}`,
    `Reason: ${reason || "—"}`,
    `Locale: ${locale}`,
    `Submitted: ${new Date().toISOString()}`,
  ];
  const text = lines.join("\n");
  const html = `
    <h2>Data Deletion Request</h2>
    <p>New data deletion request from the NutriGL Insight website.</p>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(name) || "—"}</td></tr>
      <tr><td><strong>Account email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Support / Device ID</strong></td><td>${escapeHtml(supportId) || "—"}</td></tr>
      <tr><td><strong>Reason</strong></td><td>${escapeHtml(reason) || "—"}</td></tr>
      <tr><td><strong>Locale</strong></td><td>${escapeHtml(locale)}</td></tr>
      <tr><td><strong>Submitted</strong></td><td>${new Date().toISOString()}</td></tr>
    </table>
  `;

  // If Resend isn't configured yet, log the request server-side so the form still
  // works in development. Configure RESEND_API_KEY in production to deliver email.
  if (!apiKey) {
    console.warn(
      "[delete-request] RESEND_API_KEY not set. Request received but not emailed:\n" + text,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      reply_to: email,
      subject,
      text,
      html,
    });
    if (error) {
      console.error("[delete-request] Resend error:", error);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[delete-request] Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
