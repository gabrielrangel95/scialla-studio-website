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
import { ContactFormData, locationLabels, projectTypeLabels } from "@/lib/validations/contact";

interface ClientConfirmationEmailProps {
  data: ContactFormData;
}

export const ClientConfirmationEmail = ({ data }: ClientConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting Scialla Studio - We&apos;ll be in touch within 24 hours</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo Section */}
          <Section style={logoSection}>
            <Img
              src="https://scialla-studio-website-git-main-scialla-studio.vercel.app/_next/image?url=%2Flogo_dark.png&w=384&q=75"
              width="120"
              height="auto"
              alt="Scialla Studio"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Thank You for Contacting Us</Heading>

            <Text style={text}>Dear {data.name},</Text>

            <Text style={text}>
              Thank you for reaching out to Scialla Studio. We&apos;re excited about the opportunity
              to transform your space in {locationLabels[data.location]}.
            </Text>

            {/* What's Next Section */}
            <Section style={infoBox}>
              <Heading style={h2}>What Happens Next?</Heading>
              <Text style={listText}>
                <strong>Within 24 hours:</strong> One of our design experts will contact you
              </Text>
              <Text style={listText}>
                <strong>Free consultation:</strong> We&apos;ll discuss your vision and project requirements
              </Text>
              <Text style={listText}>
                <strong>Custom proposal:</strong> Receive a tailored design solution
              </Text>
            </Section>

            {/* Project Details */}
            <Section style={detailsSection}>
              <Heading style={h2}>Your Project Details</Heading>
              <Text style={detailText}>
                <strong>Project Type:</strong> {projectTypeLabels[data.projectType]}
              </Text>
              <Text style={detailText}>
                <strong>Location:</strong> {locationLabels[data.location]}
              </Text>
              {data.message && (
                <Text style={detailText}>
                  <strong>Additional Details:</strong> {data.message}
                </Text>
              )}
            </Section>

            <Hr style={hr} />

            {/* Footer */}
            <Section style={footer}>
              <Text style={footerText}>
                Best regards,
                <br />
                <strong>The Scialla Studio Team</strong>
              </Text>
              <Text style={footerSubtext}>
                Award-winning interior design • 200+ happy clients
              </Text>
              <Text style={footerSubtext}>
                <Link href="https://sciallastudioid.com" style={link}>
                  Visit our website
                </Link>
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
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "40px",
};

const logo = {
  margin: "0 auto",
};

const content = {
  backgroundColor: "#ffffff",
};

const h1 = {
  color: "#000000",
  fontSize: "28px",
  fontWeight: "600",
  lineHeight: "1.3",
  margin: "0 0 20px 0",
  textAlign: "center" as const,
};

const h2 = {
  color: "#000000",
  fontSize: "18px",
  fontWeight: "600",
  lineHeight: "1.4",
  margin: "0 0 16px 0",
};

const text = {
  color: "#000000",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 16px 0",
};

const listText = {
  color: "#000000",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 12px 0",
};

const infoBox = {
  backgroundColor: "#f9f9f9",
  border: "1px solid #e5e5e5",
  padding: "24px",
  marginTop: "24px",
  marginBottom: "24px",
};

const detailsSection = {
  marginTop: "24px",
  marginBottom: "24px",
};

const detailText = {
  color: "#000000",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 12px 0",
};

const hr = {
  borderColor: "#e5e5e5",
  margin: "32px 0",
};

const footer = {
  textAlign: "center" as const,
  marginTop: "32px",
};

const footerText = {
  color: "#000000",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 12px 0",
};

const footerSubtext = {
  color: "#666666",
  fontSize: "13px",
  lineHeight: "1.5",
  margin: "0 0 8px 0",
};

const link = {
  color: "#000000",
  textDecoration: "underline",
};

export default ClientConfirmationEmail;
