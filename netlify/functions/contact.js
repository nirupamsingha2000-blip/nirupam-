// Example Netlify Function (Node 18+)
// This is a sample serverless function that would receive POSTed contact
// data and send an email using a provider or store it. Do NOT include
// production secrets in this file. Configure them in Netlify's UI.

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body || '{}');
  const { name, email, message } = data;

  // TODO: integrate with an email provider (SendGrid, Mailgun) or write to a DB
  console.log('Received contact', { name, email, message });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, message: 'Received' })
  };
};
