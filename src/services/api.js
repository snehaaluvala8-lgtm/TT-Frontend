const localApiUrl = import.meta.env.DEV ? 'http://localhost:8080' : ''
const API_BASE_URL = (import.meta.env.DEV ? import.meta.env.VITE_API_BASE_URL || localApiUrl : '').replace(/\/+$/, '')

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {})
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  })
  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json') && response.status !== 204
    ? await response.json()
    : null

  if (response.status === 401 && !path.startsWith('/api/auth/')) {
    window.dispatchEvent(new Event('candlecraft:auth-expired'))
  }
  if (!response.ok) {
    throw new ApiError(payload?.message || `Request failed (${response.status}). Please try again.`, response.status)
  }
  return payload
}

export const api = {
  register: (form) => request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(form),
  }),
  login: (form) => request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(form),
  }),
  currentUser: () => request('/api/auth/me'),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  stocks: () => request('/api/stocks'),
  stock: (symbol) => request(`/api/stocks/${encodeURIComponent(symbol)}`),
  portfolio: () => request('/api/portfolio'),
  transactions: () => request('/api/transactions'),
  buy: (symbol, quantity) => request('/api/trades/buy', {
    method: 'POST',
    body: JSON.stringify({ symbol, quantity: Number(quantity) }),
  }),
  sell: (symbol, quantity) => request('/api/trades/sell', {
    method: 'POST',
    body: JSON.stringify({ symbol, quantity: Number(quantity) }),
  }),
}

export function formatINR(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(value || 0))
}
