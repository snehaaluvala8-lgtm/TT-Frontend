# React + Vite

## Candle Craft frontend

The frontend is a React and Vite single-page application. It reads the backend base URL from `VITE_API_BASE_URL`; `.env.example` is a placeholder. Vite exposes `VITE_` variables to browser code, so only the public backend URL belongs there—never database credentials or the JWT signing secret.

Run it from this directory in PowerShell:

```powershell
npm install
$env:VITE_API_BASE_URL = "http://localhost:8080"
npm run dev
```

The development server normally opens at `http://localhost:5173`. Create a production build with `npm run build` and run source checks with `npm run lint`.

`src/services/api.js` sends JSON to Spring Boot and adds `Authorization: Bearer <token>` to protected requests. The JWT is stored in `sessionStorage`, cleared on sign-out or an unauthorized API response, and normally removed when the browser tab session ends. JavaScript can still access it, so an XSS vulnerability could expose it. The backend—not the client-side UI—enforces authorization.

- `src/App.jsx` selects the current page and handles the signed-in session.
- `src/pages/` contains sign-in, registration, dashboard, learning, stock, portfolio, and transaction views.
- `src/components/Navbar.jsx` provides navigation; `TradeForm.jsx` submits simulated BUY and SELL requests.
- `src/styles.css` defines the responsive layout and shared visual system.

The page switcher is intentionally in-memory rather than URL-based; refreshing restores the signed-in session and returns to the dashboard.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
