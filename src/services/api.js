const localApiUrl = import.meta.env.DEV ? 'http://localhost:8080' : ''
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || localApiUrl).replace(/\/+$/, '')
const TOKEN_KEY = 'candlecraft_access_token'
const USERNAME_KEY = 'candlecraft_username'

export function hasAuthToken() {
  return Boolean(sessionStorage.getItem(TOKEN_KEY))
}

export function getStoredUsername() {
  return sessionStorage.getItem(USERNAME_KEY) || ''
}

export function saveAuth(authResponse) {
  sessionStorage.setItem(TOKEN_KEY, authResponse.accessToken)
  sessionStorage.setItem(USERNAME_KEY, authResponse.username)
}

export function clearAuth() {
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(USERNAME_KEY)
}

async function request(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error('The backend URL is not configured. Set VITE_API_BASE_URL for this deployment.')
  }
  const headers = new Headers(options.headers || {})
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const token = sessionStorage.getItem(TOKEN_KEY)
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json') ? await response.json() : null

  if (response.status === 401 && token) {
    clearAuth()
    window.dispatchEvent(new Event('candlecraft:auth-expired'))
  }
  if (!response.ok) {
    throw new Error(payload?.message || `Request failed (${response.status}). Please try again.`)
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
