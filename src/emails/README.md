# Email Templates

This directory contains React Email templates for the Scialla Studio contact form.

## Templates

- **ClientConfirmationEmail.tsx** - Sent to customers who fill out the contact form
- **AdminNotificationEmail.tsx** - Sent to the Scialla Studio team when a new lead comes in

## Design

The templates follow Scialla Studio's minimalist aesthetic:
- Black and white color scheme
- Clean typography
- Scialla logo included
- Mobile-responsive design

## Testing Email Templates

### Preview in Browser

Run the email development server to preview templates:

```bash
npm run email:dev
```

This will start a preview server (usually at http://localhost:3000) where you can view and test all email templates in real-time.

### Manual Testing

To test the emails in a real email client, you can:

1. Send a test through the contact form on the live site
2. Or use Resend's test mode by checking their dashboard

## Email Flow

When a user submits the contact form:

1. **Client Email** is sent to the customer with CC to:
   - gabriel@sevenapps.tech
   - info@sciallastudioid.com

2. **Admin Email** is sent to:
   - gabriel@sevenapps.tech
   - info@sciallastudioid.com

This ensures the team is always notified of new leads and can see exactly what the customer received.

## Customization

To update the email templates:

1. Edit the template files in this directory
2. The styles are defined inline at the bottom of each file
3. Changes will be reflected immediately when running `npm run email:dev`

## Logo

The Scialla logo is hosted on the production site:
- URL: https://scialla-studio-website-git-main-scialla-studio.vercel.app/_next/image?url=%2Flogo_dark.png&w=384&q=75
- Local file: /public/logo_dark.png

If you need to update the logo, replace the file in `/public/` and update the URL in the email templates.
