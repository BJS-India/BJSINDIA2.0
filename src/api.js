const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

// Endpoint paths can be aligned with the PHP team's API contract.
export async function subscribeNewsletter(contact, signal) {
  if (!baseUrl) return { configured: false };
  const response = await fetch(`${baseUrl}/newsletter/subscribe`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact.includes('@') ? { email: contact } : { whatsapp: contact }), signal,
  });
  if (!response.ok) throw new Error('Subscription could not be completed. Please try again.');
  return { configured: true };
}
