import { ContactFormData, locationLabels, projectTypeLabels } from "@/lib/validations/contact";

export function generateClientEmailTemplate(data: ContactFormData) {
  return {
    subject: "Thank you for contacting Scialla Studio - We'll be in touch within 24 hours",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank you for contacting Scialla Studio</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .highlight { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Scialla Studio!</h1>
              <p>Your interior design journey starts here</p>
            </div>
            
            <div class="content">
              <p>Dear ${data.name},</p>
              
              <p>Thank you for reaching out to Scialla Studio! We're excited about the opportunity to transform your space in ${locationLabels[data.location]}.</p>
              
              <div class="highlight">
                <h3>What happens next?</h3>
                <ul>
                  <li><strong>Within 24 hours:</strong> One of our design experts will contact you</li>
                  <li><strong>Free consultation:</strong> We'll discuss your vision and project requirements</li>
                  <li><strong>Custom proposal:</strong> Receive a tailored design solution</li>
                </ul>
              </div>
              
              <h3>Your Project Details:</h3>
              <ul>
                <li><strong>Project Type:</strong> ${projectTypeLabels[data.projectType]}</li>
                <li><strong>Location:</strong> ${locationLabels[data.location]}</li>
                ${data.message ? `<li><strong>Additional Details:</strong> ${data.message}</li>` : ''}
              </ul>
              
              <p>In the meantime, feel free to browse our portfolio and recent projects on our website.</p>
              
              <div class="footer">
                <p>Best regards,<br>The Scialla Studio Team</p>
                <p>Award-winning interior design • 200+ happy clients</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Dear ${data.name},

      Thank you for contacting Scialla Studio! We're excited about the opportunity to transform your space in ${locationLabels[data.location]}.

      What happens next?
      • Within 24 hours: One of our design experts will contact you
      • Free consultation: We'll discuss your vision and project requirements  
      • Custom proposal: Receive a tailored design solution

      Your Project Details:
      • Project Type: ${projectTypeLabels[data.projectType]}
      • Location: ${locationLabels[data.location]}
      ${data.message ? `• Additional Details: ${data.message}` : ''}

      Best regards,
      The Scialla Studio Team
      Award-winning interior design • 200+ happy clients
    `
  };
}

export function generateAdminEmailTemplate(data: ContactFormData) {
  return {
    subject: `New Contact Form Submission - ${data.name} (${locationLabels[data.location]})`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin: 15px 0; padding: 15px; background: white; border-radius: 6px; border-left: 4px solid #dc3545; }
            .field strong { color: #dc3545; }
            .urgent { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚨 New Lead Alert</h1>
              <p>Contact form submission from website</p>
            </div>
            
            <div class="content">
              <div class="urgent">
                <strong>⏰ Action Required:</strong> Follow up within 24 hours for best conversion rates
              </div>
              
              <div class="field">
                <strong>Name:</strong> ${data.name}
              </div>
              
              <div class="field">
                <strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a>
              </div>
              
              <div class="field">
                <strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a>
              </div>
              
              <div class="field">
                <strong>Location:</strong> ${locationLabels[data.location]}
              </div>
              
              <div class="field">
                <strong>Project Type:</strong> ${projectTypeLabels[data.projectType]}
              </div>
              
              ${data.message ? `
                <div class="field">
                  <strong>Message:</strong><br>
                  ${data.message}
                </div>
              ` : ''}
              
              <div class="field">
                <strong>Submitted:</strong> ${new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      🚨 NEW LEAD ALERT 🚨
      
      Action Required: Follow up within 24 hours
      
      Contact Details:
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      Location: ${locationLabels[data.location]}
      Project Type: ${projectTypeLabels[data.projectType]}
      ${data.message ? `Message: ${data.message}` : ''}
      
      Submitted: ${new Date().toLocaleString()}
    `
  };
}