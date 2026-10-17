import { useState } from 'react'
import { api } from '../services/api.js'

function Login({ onAuthenticated, onRegister }) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      onAuthenticated(await api.login({ identifier, password }))
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-card">
      <span className="eyebrow">WELCOME BACK</span>
      <h2>Sign in to practise</h2>
      <p className="muted">Pick up where your learning left off.</p>
      <form className="stack-form" onSubmit={handleSubmit}>
        <label>
          Username or email
          <input autoComplete="username" value={identifier} onChange={(event) => setIdentifier(event.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error && <p className="form-alert error" role="alert">{error}</p>}
        <button className="button button-primary button-full" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="auth-switch">New to Candle Craft? <button type="button" onClick={onRegister}>Create an account</button></p>
      <p className="tiny-note auth-disclaimer">This is an educational simulator, not an investment service.</p>
    </section>
  )
}

export default Login
