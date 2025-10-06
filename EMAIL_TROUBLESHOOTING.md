# Email Troubleshooting Guide

## Overview

The contact form now has improved error handling and debugging to help identify why emails aren't sending.

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Required for email sending
RESEND_API_KEY="re_xxxxxxxxxxxxx"

# Optional - for saving contacts to Resend audience
RESEND_AUDIENCE_ID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

## How to Get Your Resend Configuration

### 1. Get API Key
1. Go to https://resend.com/api-keys
2. Create a new API key or copy existing one
3. Add to `.env.local` as `RESEND_API_KEY`

### 2. Verify Your Domain
**CRITICAL:** The `from` email domain MUST be verified in Resend

Current from addresses:
- `contact@sciallastudioid.com`

Steps:
1. Go to https://resend.com/domains
2. Add domain: `sciallastudioid.com`
3. Follow DNS verification steps
4. Wait for verification (can take a few minutes to 24 hours)

**Note:** Until domain is verified, emails will fail silently!

### 3. Create Audience (Optional)
For contact saving feature:
1. Go to https://resend.com/audiences
2. Create a new audience (e.g., "Scialla Studio Leads")
3. Copy the Audience ID
4. Add to `.env.local` as `RESEND_AUDIENCE_ID`

## Debugging Email Issues

### Check Server Logs

When you submit the contact form, check your terminal/console for detailed logs:

```
Processing contact form submission: { email: '...', name: '...', location: '...' }
Rendering email templates...
Email templates rendered successfully
Sending emails...
Client email sent successfully: { id: 'xxx-xxx-xxx' }
Admin email sent successfully: { id: 'xxx-xxx-xxx' }
All emails sent successfully
Saving contact to Resend...
Contact saved to Resend: { id: 'xxx', email: '...' }
```

### Common Issues

#### Issue 1: "Email service is not configured"
**Cause:** `RESEND_API_KEY` is missing or set to dummy value

**Solution:** Add valid Resend API key to `.env.local`

#### Issue 2: "Failed to send emails"
**Causes:**
- Domain not verified in Resend
- Invalid API key
- Rate limit exceeded
- Invalid email addresses

**Solution:**
1. Check server logs for detailed error message
2. Verify domain at https://resend.com/domains
3. Check API key is correct
4. Verify email addresses are valid

#### Issue 3: Returns 200 but no emails received
**This should NO LONGER happen** - the API now returns 500 if emails fail.

If you still get 200 with no emails:
1. Check spam folder
2. Check Resend logs: https://resend.com/emails
3. Verify domain is verified
4. Check server console logs for error details

#### Issue 4: "Failed to save contact to Resend (non-critical)"
**Cause:** Audience ID not configured or invalid

**Solution:**
- This is a warning only - emails still sent
- Add `RESEND_AUDIENCE_ID` to `.env.local`
- Create audience in Resend dashboard

## Testing the Form

### Development Testing

1. Start dev server: `npm run dev`
2. Open browser console and network tab
3. Fill out contact form
4. Submit and watch for:
   - Network request to `/api/contact`
   - Response should be 200 with `success: true`
   - Check terminal for detailed logs

### Production Testing

1. Check Vercel logs or your hosting provider's logs
2. Look for the console.log statements
3. Check Resend dashboard for email activity

## Email Flow

When form is submitted:

1. **Validation:** Form data validated with Zod schema
2. **Render Templates:** React Email components rendered to HTML
3. **Send Client Email:**
   - To: Customer email
   - CC: gabriel@sevenapps.tech
   - From: contact@sciallastudioid.com
4. **Send Admin Email:**
   - To: gabriel@sevenapps.tech
   - From: contact@sciallastudioid.com
5. **Save Contact:** Add to Resend audience (optional)
6. **Return Success:** Only if all emails sent

## Resend Dashboard

Check your emails at: https://resend.com/emails

You should see:
- All sent emails
- Delivery status
- Error details if any failed
- Open/click tracking

## Contact Information

Emails are sent to:
- Customer: Their provided email (with CC to team)
- Team: gabriel@sevenapps.tech

Both emails use `contact@sciallastudioid.com` as sender.

## Next Steps

If emails still aren't working after following this guide:

1. Check Resend dashboard for error messages
2. Verify all environment variables are set correctly
3. Check domain verification status
4. Review server logs for specific error messages
5. Contact Resend support if needed
