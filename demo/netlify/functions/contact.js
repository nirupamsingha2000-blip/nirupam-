// Example Netlify Function (Node 18+)
// Receives POSTed contact data. If SENDGRID_API_KEY is configured in your
// environment, this will attempt to send an email via SendGrid. Otherwise
// it simply logs the payload and returns a success response.
//
// IMPORTANT: Do NOT hardcode API keys here. Set SENDGRID_API_KEY in Netlify
// or your environment provider's secret settings.

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let data = {};
  try {
    data = JSON.parse(event.body || '{}');
  } catch (err) {
    console.warn('Invalid JSON body');
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'Invalid JSON' }) };
  }

  const { name, email, message } = data;
  console.log('Received contact', { name, email });

  // If SendGrid is configured, send an email
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  if (SENDGRID_API_KEY) {
    try {
      // Lazy require so local dev doesn't need SendGrid installed
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(SENDGRID_API_KEY);
      const sendRes = await sgMail.send({
        to: process.env.CONTACT_RECEIVER || 'you@example.com',
        from: process.env.SENDGRID_FROM || 'noreply@example.com',
        subject: `Contact from website: ${name || 'Visitor'}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
      console.log('SendGrid result', sendRes && sendRes[0] && sendRes[0].statusCode);
      return { statusCode: 200, body: JSON.stringify({ ok: true, sent: true }) };
    } catch (err) {
      console.error('SendGrid failed', err && err.message);
      // fallthrough to return logged response
    }
  }

  // Default: return success and log. Integrate with DB or other provider as needed.
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, received: true })
  };
};
