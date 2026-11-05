const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const cleanBaseUrl = rawBaseUrl.trim().replace(/\/$/, '');
const baseUrl = cleanBaseUrl.endsWith('/api') ? cleanBaseUrl : `${cleanBaseUrl}/api`;

// Newsletter Subscription API
export async function subscribeNewsletter(contact, signal) {
  if (!baseUrl) return { configured: false };
  const response = await fetch(`${baseUrl}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact.includes('@') ? { email: contact } : { whatsapp: contact }),
    signal,
  });
  if (!response.ok) throw new Error('Subscription could not be completed. Please try again.');
  return { configured: true };
}

// Baskets API
export async function fetchBaskets(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${baseUrl}/baskets${query ? `?${query}` : ''}`;
  console.log("Checkkk url ", url)

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch baskets (${response.status})`);
  const result = await response.json();
  return result.data || [];
}

export async function fetchBasketById(id, params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${baseUrl}/baskets/${id}${query ? `?${query}` : ''}`;
  const response = await fetch(url);

  if (!response.ok) throw new Error(`Failed to fetch basket (${response.status})`);
  const result = await response.json();
  return result.data;
}

// Programs API
export async function fetchPrograms(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${baseUrl}/programs${query ? `?${query}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch programs (${response.status})`);
  const result = await response.json();
  return result.data || [];
}

export async function fetchProgramById(id, params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${baseUrl}/programs/${id}${query ? `?${query}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch program details (${response.status})`);
  const result = await response.json();
  return result.data;
}

export async function fetchProgramsByBasket(basketId, params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${baseUrl}/baskets/${basketId}/programs${query ? `?${query}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch programs for basket (${response.status})`);
  const result = await response.json();
  return result.data || [];
}

// Program Content API
export async function fetchProgramContent(programId) {
  const url = `${baseUrl}/program-contents/${programId}`;
  const response = await fetch(url);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to fetch program content (${response.status})`);
  const result = await response.json();
  return result.data;
}
