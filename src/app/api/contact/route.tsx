import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { contactFormSchema } from "@/lib/validations/contact";
import { ClientConfirmationEmail } from "@/emails/ClientConfirmationEmail";
import { AdminNotificationEmail } from "@/emails/AdminNotificationEmail";
import { checkRateLimit } from "@/lib/rate-limiter";

const resend = new Resend(process.env.RESEND_API_KEY || "dummy-key-for-build");

// Helper function to verify Cloudflare Turnstile token
async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    // In development, you might want to skip this check
    return process.env.NODE_ENV === "development";
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
          remoteip: ip,
        }),
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}

// Helper function to get client IP address
function getClientIp(request: NextRequest): string {
  // Check various headers for the real IP
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  // Prefer Cloudflare's IP, then x-forwarded-for, then x-real-ip
  if (cfConnectingIp) return cfConnectingIp;
  if (forwarded) return forwarded.split(",")[0].trim();
  if (realIp) return realIp;

  // Fallback to a generic IP (should rarely happen on Vercel/Cloudflare)
  return "unknown";
}

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (
      !process.env.RESEND_API_KEY ||
      process.env.RESEND_API_KEY === "dummy-key-for-build"
    ) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured. Please contact support.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Validate the form data
    const validatedData = contactFormSchema.parse(body);

    // Get client IP for rate limiting and bot detection
    const clientIp = getClientIp(request);

    // ============================================
    // BOT PROTECTION - 3 LAYERS
    // ============================================

    // LAYER 1: Submission Timing Check
    // Bots usually submit forms instantly (<3 seconds)
    if (validatedData.submissionTime) {
      const submissionDuration = Date.now() - validatedData.submissionTime;
      const minSubmissionTime = 3000; // 3 seconds

      if (submissionDuration < minSubmissionTime) {
        console.warn(
          `Suspicious submission detected from ${clientIp}: submitted in ${submissionDuration}ms`
        );
        return NextResponse.json(
          {
            success: false,
            error: "Form submitted too quickly. Please try again.",
          },
          { status: 400 }
        );
      }
    }

    // LAYER 2: Rate Limiting (5 submissions per hour per IP)
    const rateLimitResult = await checkRateLimit(clientIp);

    if (!rateLimitResult.allowed) {
      const minutesRemaining = Math.ceil(
        (rateLimitResult.msBeforeNext || 0) / 60000
      );
      console.warn(
        `Rate limit exceeded for IP ${clientIp}. ${minutesRemaining} minutes remaining.`
      );
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions. Please try again in ${minutesRemaining} minute${minutesRemaining !== 1 ? "s" : ""}.`,
        },
        { status: 429 }
      );
    }

    // LAYER 3: Cloudflare Turnstile Verification
    if (validatedData.turnstileToken) {
      const isValid = await verifyTurnstileToken(
        validatedData.turnstileToken,
        clientIp
      );

      if (!isValid) {
        console.warn(
          `Turnstile verification failed for ${clientIp}. Token: ${validatedData.turnstileToken}`
        );
        return NextResponse.json(
          {
            success: false,
            error:
              "Security verification failed. Please refresh the page and try again.",
          },
          { status: 400 }
        );
      }
    } else {
      // If no turnstile token provided, reject the submission
      console.warn(`No Turnstile token provided from ${clientIp}`);
      return NextResponse.json(
        {
          success: false,
          error: "Security verification missing. Please refresh the page.",
        },
        { status: 400 }
      );
    }

    console.log(`All bot protection checks passed for ${clientIp}`);

    console.log("Processing contact form submission:", {
      email: validatedData.email,
      name: validatedData.name,
      location: validatedData.location,
    });

    // Render React Email templates to HTML
    console.log("Rendering email templates...");
    const clientEmailHtml = await render(
      <ClientConfirmationEmail data={validatedData} />
    );
    const adminEmailHtml = await render(
      <AdminNotificationEmail data={validatedData} />
    );
    console.log("Email templates rendered successfully");

    // Send emails concurrently
    console.log("Sending emails...");
    const [clientEmailResult, adminEmailResult] = await Promise.allSettled([
      // Send confirmation email to client with CC to team
      resend.emails.send({
        from: "Scialla Studio <contact@sciallastudioid.com>",
        to: [validatedData.email],
        cc: ["gabriel@sevenapps.tech", "info@sciallastudioid.com"],
        subject:
          "Thank you for contacting Scialla Studio - We'll be in touch within 24 hours",
        html: clientEmailHtml,
      }),

      // Send notification email to admin
      resend.emails.send({
        from: "Website Contact Form <contact@sciallastudioid.com>",
        to: ["gabriel@sevenapps.tech", "info@sciallastudioid.com"],
        subject: `New Contact Form Submission - ${validatedData.name} (${validatedData.location})`,
        html: adminEmailHtml,
      }),
    ]);

    // Check if emails were sent successfully and log detailed results
    const emailErrors: string[] = [];

    if (clientEmailResult.status === "rejected") {
      console.error("Failed to send client email:", clientEmailResult.reason);
      emailErrors.push("client confirmation");
    } else {
      console.log("Client email sent successfully:", clientEmailResult.value);
    }

    if (adminEmailResult.status === "rejected") {
      console.error("Failed to send admin email:", adminEmailResult.reason);
      emailErrors.push("admin notification");
    } else {
      console.log("Admin email sent successfully:", adminEmailResult.value);
    }

    // IMPORTANT: Fail the request if emails didn't send
    if (emailErrors.length > 0) {
      console.error(`Email sending failed: ${emailErrors.join(", ")}`);
      return NextResponse.json(
        {
          success: false,
          error:
            "Failed to send emails. Please try again or contact us directly.",
          details: emailErrors,
        },
        { status: 500 }
      );
    }

    console.log("All emails sent successfully");

    // Save contact to Resend contacts
    try {
      console.log("Saving contact to Resend...");
      const contactResult = await resend.contacts.create({
        email: validatedData.email,
        firstName: validatedData.name.split(" ")[0] || validatedData.name,
        lastName: validatedData.name.split(" ").slice(1).join(" ") || "",
        audienceId: process.env.RESEND_AUDIENCE_ID as string,
      });

      console.log("Contact saved to Resend:", contactResult);
    } catch (contactError) {
      // Log but don't fail the request - emails were sent successfully
      console.warn(
        "Failed to save contact to Resend (non-critical):",
        contactError
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Form submitted successfully. We'll contact you within 24 hours!",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    // Handle validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid form data. Please check your inputs and try again.",
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
