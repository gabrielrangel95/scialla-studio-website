import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import {
  ContactFormData,
  locationLabels,
  projectTypeLabels,
} from "@/lib/validations/contact";

interface AdminNotificationEmailProps {
  data: ContactFormData;
}

export const AdminNotificationEmail = ({
  data,
}: AdminNotificationEmailProps) => {
  const submissionDate = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <Html>
      <Head />
      <Preview>
        New Contact Form Submission - {data.name} (
        {locationLabels[data.location]})
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo Section */}
          <Section style={logoSection}>
            <Img
              src="https://scialla-studio-website.vercel.app/logo_dark.png"
              width="100"
              height="auto"
              alt="Scialla Studio"
              style={logo}
            />
          </Section>

          {/* Alert Header */}
          <Section style={alertBox}>
            <Heading style={alertHeading}>New Lead Alert</Heading>
            <Text style={alertText}>Contact form submission from website</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            {/* Action Required */}
            <Section style={urgentBox}>
              <Text style={urgentText}>
                <strong>⏰ Action Required:</strong> Follow up within 24 hours
                for best conversion rates
              </Text>
            </Section>

            {/* Contact Details */}
            <Section style={detailsSection}>
              <Heading style={h2}>Contact Information</Heading>

              <Section style={fieldBox}>
                <Text style={fieldLabel}>Name</Text>
                <Text style={fieldValue}>{data.name}</Text>
              </Section>

              <Section style={fieldBox}>
                <Text style={fieldLabel}>Email</Text>
                <Text style={fieldValue}>
                  <Link href={`mailto:${data.email}`} style={link}>
                    {data.email}
                  </Link>
                </Text>
              </Section>

              <Section style={fieldBox}>
                <Text style={fieldLabel}>Phone</Text>
                <Text style={fieldValue}>
                  <Link href={`tel:${data.phone}`} style={link}>
                    {data.phone}
                  </Link>
                </Text>
              </Section>

              <Section style={fieldBox}>
                <Text style={fieldLabel}>Location</Text>
                <Text style={fieldValue}>{locationLabels[data.location]}</Text>
              </Section>

              <Section style={fieldBox}>
                <Text style={fieldLabel}>Project Type</Text>
                <Text style={fieldValue}>
                  {projectTypeLabels[data.projectType]}
                </Text>
              </Section>

              {data.message && (
                <Section style={fieldBox}>
                  <Text style={fieldLabel}>Message</Text>
                  <Text style={fieldValue}>{data.message}</Text>
                </Section>
              )}

              <Section style={fieldBox}>
                <Text style={fieldLabel}>Submitted</Text>
                <Text style={fieldValue}>{submissionDate}</Text>
              </Section>
            </Section>

            <Hr style={hr} />

            {/* Footer */}
            <Section style={footer}>
              <Text style={footerText}>
                Scialla Studio Contact Management System
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Minimalist Black & White Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "30px",
};

const logo = {
  margin: "0 auto",
};

const alertBox = {
  backgroundColor: "#000000",
  padding: "24px",
  textAlign: "center" as const,
  marginBottom: "30px",
};

const alertHeading = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "600",
  margin: "0 0 8px 0",
};

const alertText = {
  color: "#ffffff",
  fontSize: "14px",
  margin: "0",
};

const content = {
  backgroundColor: "#ffffff",
};

const urgentBox = {
  backgroundColor: "#f5f5f5",
  border: "2px solid #000000",
  padding: "16px",
  marginBottom: "30px",
};

const urgentText = {
  color: "#000000",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0",
  textAlign: "center" as const,
};

const detailsSection = {
  marginBottom: "30px",
};

const h2 = {
  color: "#000000",
  fontSize: "18px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "0 0 20px 0",
  borderBottom: "2px solid #000000",
  paddingBottom: "8px",
};

const fieldBox = {
  backgroundColor: "#fafafa",
  border: "1px solid #e5e5e5",
  borderLeft: "3px solid #000000",
  padding: "16px",
  marginBottom: "12px",
};

const fieldLabel = {
  color: "#666666",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 6px 0",
};

const fieldValue = {
  color: "#000000",
  fontSize: "15px",
  lineHeight: "1.5",
  margin: "0",
  wordBreak: "break-word" as const,
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "30px 0",
};

const footer = {
  textAlign: "center" as const,
};

const footerText = {
  color: "#999999",
  fontSize: "12px",
  margin: "0",
};

const link = {
  color: "#000000",
  textDecoration: "underline",
};

export default AdminNotificationEmail;
