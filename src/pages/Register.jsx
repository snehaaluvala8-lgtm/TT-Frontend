import { useState } from 'react'
import { api } from '../services/api.js'

function Register({ onAuthenticated, onLogin }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      onAuthenticated(await api.register({ username, email, password }))
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-card">
      <span className="eyebrow">START LEARNING</span>
      <h2>Create your account</h2>
      <p className="muted">Your virtual wallet starts with ₹50,000.</p>
      <form className="stack-form" onSubmit={handleSubmit}>
        <label>
          Username
          <input autoComplete="username" minLength="3" maxLength="30" value={username} onChange={(event) => setUsername(event.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" autoComplete="email" maxLength="254" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          Password <span className="label-hint">at least 8 characters</span>
          <input type="password" autoComplete="new-password" minLength="8" maxLength="72" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error && <p className="form-alert error" role="alert">{error}</p>}
        <button className="button button-primary button-full" disabled={busy}>
          {busy ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="auth-switch">Already have an account? <button type="button" onClick={onLogin}>Sign in</button></p>
      <p className="tiny-note auth-disclaimer">By joining, you understand that prices and trades are simulated.</p>
    </section>
  )
}

export default Register
