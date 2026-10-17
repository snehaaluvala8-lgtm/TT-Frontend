# Candle Craft frontend

React and Vite single-page app for the Candle Craft learning simulator.

## Local development

The frontend uses `VITE_API_BASE_URL` only in development. `.env.example` contains a local backend URL placeholder.

```powershell
npm install
$env:VITE_API_BASE_URL = "http://localhost:8080"
npm run dev
```

Run source checks with `npm run lint` and create a production build with `npm run build`. When running the backend locally over HTTP, set `AUTH_COOKIE_SECURE=false` for that backend process; never use that setting in production.

## Authentication and deployment

The frontend sends requests with credentials enabled. Production requests use same-origin `/api` routes, which `vercel.json` rewrites to the Render backend. Do not configure a production `VITE_API_BASE_URL` pointing directly to Render.

The backend sets the signed session JWT in an `HttpOnly`, `Secure`, `SameSite=Lax` cookie. JavaScript cannot read the cookie. The app restores the signed-in user through `/api/auth/me` and signs out through `/api/auth/logout`; it does not store credentials or tokens in browser storage. The backend independently enforces authorization for app data and APIs.

- `src/App.jsx` selects the current page and restores the server-side session.
- `src/pages/` contains sign-in, registration, dashboard, learning, stock, portfolio, and transaction views.
- `src/components/Navbar.jsx` provides navigation; `TradeForm.jsx` submits simulated BUY and SELL requests.
- `src/styles.css` defines the responsive layout and shared visual system.

The page switcher is intentionally in-memory rather than URL-based; refreshing validates the session cookie and returns to the dashboard when signed in.
