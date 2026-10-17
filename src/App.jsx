import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Learn from './pages/Learn.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Register from './pages/Register.jsx'
import Stocks from './pages/Stocks.jsx'
import Transactions from './pages/Transactions.jsx'
import { clearAuth, getStoredUsername, hasAuthToken, saveAuth } from './services/api.js'

const pageTitles = {
  Dashboard: 'Your learning dashboard',
  Learn: 'Learn at your own pace',
  Stocks: 'Explore the market',
  Portfolio: 'Your paper portfolio',
  Transactions: 'Your activity',
}

function App() {
  const [authenticated, setAuthenticated] = useState(hasAuthToken)
  const [username, setUsername] = useState(getStoredUsername)
  const [page, setPage] = useState('Dashboard')
  const [refreshId, setRefreshId] = useState(0)
  const [authMode, setAuthMode] = useState('landing')

  useEffect(() => {
    const handleExpiredSession = () => {
      clearAuth()
      setAuthenticated(false)
      setUsername('')
      setAuthMode('login')
    }
    window.addEventListener('candlecraft:auth-expired', handleExpiredSession)
    return () => window.removeEventListener('candlecraft:auth-expired', handleExpiredSession)
  }, [])

  const handleAuthenticated = (authResponse) => {
    saveAuth(authResponse)
    setAuthenticated(true)
    setUsername(authResponse.username)
    setPage('Dashboard')
  }

  const handleLogout = () => {
    clearAuth()
    setAuthenticated(false)
    setUsername('')
    setAuthMode('login')
  }

  const refreshAccount = () => setRefreshId((value) => value + 1)

  if (!authenticated) {
    if (authMode === 'landing') {
      return (
        <Landing
          onLogin={() => setAuthMode('login')}
          onRegister={() => setAuthMode('register')}
        />
      )
    }

    return (
      <div className="auth-layout">
        <div className="auth-aside">
          <a className="brand brand-light" href="/" aria-label="Candle Craft home">
            <span className="brand-mark" aria-hidden="true">C</span>
            <span>Candle Craft</span>
          </a>
          <div className="auth-pitch">
            <span className="eyebrow">LEARN BY PRACTISING</span>
            <h1>Build confidence before you invest.</h1>
            <p>Understand the basics, explore simulated prices, and practise with virtual money.</p>
            <div className="market-art" aria-hidden="true">
              <span className="candle candle-one" />
              <span className="candle candle-two" />
              <span className="candle candle-three" />
              <span className="candle candle-four" />
              <span className="art-line" />
            </div>
            <p className="disclaimer">Educational simulator only. No real orders or money.</p>
            <button className="auth-home-link" type="button" onClick={() => setAuthMode('landing')}>
              ← Back to home
            </button>
          </div>
        </div>
        <main className="auth-main">
          <div className="mobile-brand">
            <span className="brand-mark" aria-hidden="true">C</span>
            <span>Candle Craft</span>
          </div>
          {authMode === 'login' ? (
            <Login
              onAuthenticated={handleAuthenticated}
              onRegister={() => setAuthMode('register')}
            />
          ) : (
            <Register
              onAuthenticated={handleAuthenticated}
              onLogin={() => setAuthMode('login')}
            />
          )}
        </main>
      </div>
    )
  }

  const pageContent = {
    Dashboard: <Dashboard key={refreshId} onNavigate={setPage} onTradeDone={refreshAccount} />,
    Learn: <Learn />,
    Stocks: <Stocks onTradeDone={refreshAccount} />,
    Portfolio: <Portfolio key={refreshId} onTradeDone={refreshAccount} />,
    Transactions: <Transactions key={refreshId} />,
  }

  return (
    <div className="app-shell">
      <Navbar
        activePage={page}
        onNavigate={setPage}
        onLogout={handleLogout}
        username={username}
      />
      <main className="main-content">
        <header className="page-heading">
          <div>
            <span className="eyebrow">CANDLE CRAFT / PAPER TRADING</span>
            <h1>{pageTitles[page]}</h1>
          </div>
          <span className="simulator-badge"><span /> SIMULATED PRICES</span>
        </header>
        {pageContent[page]}
        <footer className="app-footer">
          <span>Practice thoughtfully. Learn before you invest.</span>
          <span>Educational simulator · Not financial advice</span>
        </footer>
      </main>
    </div>
  )
}

export default App
