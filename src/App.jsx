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
import { api } from './services/api.js'

const pageTitles = {
  Dashboard: 'Your learning dashboard',
  Learn: 'Learn at your own pace',
  Stocks: 'Explore the market',
  Portfolio: 'Your paper portfolio',
  Transactions: 'Your activity',
}

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [page, setPage] = useState('Dashboard')
  const [refreshId, setRefreshId] = useState(0)
  const [authMode, setAuthMode] = useState('landing')
  const [sessionStatus, setSessionStatus] = useState('checking')
  const [sessionError, setSessionError] = useState('')
  const [sessionCheckId, setSessionCheckId] = useState(0)

  useEffect(() => {
    let active = true
    api.currentUser()
      .then((user) => {
        if (!active) return
        setUsername(user.username)
        setAuthenticated(true)
        setSessionStatus('ready')
      })
      .catch((error) => {
        if (!active) return
        if (error.status === 401) {
          setAuthenticated(false)
          setUsername('')
          setSessionStatus('ready')
          return
        }
        setSessionError(error.message)
        setSessionStatus('error')
      })
    return () => { active = false }
  }, [sessionCheckId])

  useEffect(() => {
    const handleExpiredSession = () => {
      setAuthenticated(false)
      setUsername('')
      setAuthMode('login')
      setSessionStatus('ready')
    }
    window.addEventListener('candlecraft:auth-expired', handleExpiredSession)
    return () => window.removeEventListener('candlecraft:auth-expired', handleExpiredSession)
  }, [])

  const handleAuthenticated = (authResponse) => {
    setAuthenticated(true)
    setUsername(authResponse.username)
    setSessionStatus('ready')
    setSessionError('')
    setPage('Dashboard')
  }

  const handleLogout = async () => {
    setSessionError('')
    try {
      await api.logout()
      setAuthenticated(false)
      setUsername('')
      setAuthMode('login')
    } catch (error) {
      setSessionError(`Could not sign out: ${error.message}`)
    }
  }

  const refreshAccount = () => setRefreshId((value) => value + 1)
  const retrySessionCheck = () => {
    setSessionError('')
    setSessionStatus('checking')
    setSessionCheckId((value) => value + 1)
  }

  if (sessionStatus === 'checking') {
    return <main className="auth-main" aria-live="polite">Checking your session…</main>
  }

  if (sessionStatus === 'error') {
    return (
      <main className="auth-main">
        <p className="form-alert error" role="alert">Could not verify your session: {sessionError}</p>
        <button className="button button-primary" type="button" onClick={retrySessionCheck}>
          Retry
        </button>
      </main>
    )
  }

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
        {sessionError && <p className="form-alert error" role="alert">{sessionError}</p>}
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
