import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema, ContactFormData } from "@/lib/validations/contact";
import { generateClientEmailTemplate, generateAdminEmailTemplate } from "@/lib/email/templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the form data
    const validatedData = contactFormSchema.parse(body);

    // Generate email templates
    const clientEmail = generateClientEmailTemplate(validatedData);
    const adminEmail = generateAdminEmailTemplate(validatedData);

    // Send emails concurrently
    const [clientEmailResult, adminEmailResult] = await Promise.allSettled([
      // Send confirmation email to client
      resend.emails.send({
        from: "Scialla Studio <noreply@sciallastudioid.com>", // Replace with your verified domain
        to: [validatedData.email],
        subject: clientEmail.subject,
        html: clientEmail.html,
        text: clientEmail.text,
      }),

      // Send notification email to admin
      resend.emails.send({
        from: "Website Contact Form <noreply@sciallastudioid.com>", // Replace with your verified domain
        to: ["info@sciallastudioid.com"], // Replace with your business email
        subject: adminEmail.subject,
        html: adminEmail.html,
        text: adminEmail.text,
      }),
    ]);

    // Check if emails were sent successfully
    let emailErrors: string[] = [];

    if (clientEmailResult.status === "rejected") {
      console.error("Failed to send client email:", clientEmailResult.reason);
      emailErrors.push("client confirmation");
    }

    if (adminEmailResult.status === "rejected") {
      console.error("Failed to send admin email:", adminEmailResult.reason);
      emailErrors.push("admin notification");
    }

    // Return success even if some emails failed (form submission succeeded)
    if (emailErrors.length > 0) {
      console.warn(`Email sending partially failed: ${emailErrors.join(", ")}`);
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully. We'll contact you within 24 hours!",
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