import { useState } from 'react'
import { api, formatINR } from '../services/api.js'

function TradeForm({ symbol, price, onTradeDone }) {
  const [quantity, setQuantity] = useState('1')
  const [tradeType, setTradeType] = useState('buy')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const total = Number(price || 0) * Number(quantity || 0)

  async function handleSubmit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const result = await api[tradeType](symbol, quantity)
      setMessage(`${result.message} ${formatINR(result.totalValue)} ${tradeType === 'buy' ? 'spent' : 'received'}.`)
      onTradeDone()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="trade-form" onSubmit={handleSubmit}>
      <div className="trade-form-title">
        <div>
          <span className="eyebrow">PAPER TRADE</span>
          <h3>{symbol}</h3>
        </div>
        <span className="trade-price">{formatINR(price)} <small>/ unit</small></span>
      </div>
      <div className="trade-controls">
        <label>
          Action
          <select value={tradeType} onChange={(event) => setTradeType(event.target.value)}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </label>
        <label>
          Quantity
          <input
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
        </label>
      </div>
      <div className="trade-estimate"><span>Estimated total</span><strong>{formatINR(total)}</strong></div>
      {error && <p className="form-alert error" role="alert">{error}</p>}
      {message && <p className="form-alert success" role="status">{message}</p>}
      <button className={`button button-full ${tradeType === 'sell' ? 'button-dark' : 'button-primary'}`} disabled={busy || !quantity || Number(quantity) < 1}>
        {busy ? 'Processing…' : `${tradeType === 'buy' ? 'Buy' : 'Sell'} ${symbol}`}
      </button>
      <p className="tiny-note">Uses the displayed simulated price. No real order is placed.</p>
    </form>
  )
}

export default TradeForm
