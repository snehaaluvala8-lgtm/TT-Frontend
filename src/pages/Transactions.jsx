import { useEffect, useState } from 'react'
import { api, formatINR } from '../services/api.js'

function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.transactions()
      .then(setTransactions)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading-card">Loading your activity…</div>
  if (error) return <div className="form-alert error" role="alert">{error}</div>

  return (
    <section className="panel">
      <div className="panel-heading">
        <div><span className="eyebrow">PAPER TRADE LOG</span><h2>Transaction history</h2></div>
        <span className="count-pill">{transactions.length} trades</span>
      </div>
      {transactions.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">↻</span>
          <h3>No activity just yet</h3>
          <p>Successful paper trades will show up here with their simulated execution details.</p>
        </div>
      ) : (
        <div className="responsive-table">
          <table>
            <thead><tr><th>TYPE</th><th>STOCK</th><th>QUANTITY</th><th>EXECUTION PRICE</th><th>TOTAL VALUE</th><th>DATE &amp; TIME (UTC)</th></tr></thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={`${transaction.symbol}-${transaction.createdAt}-${index}`}>
                  <td><span className={`type-pill ${transaction.type.toLowerCase()}`}>{transaction.type}</span></td>
                  <td><strong>{transaction.symbol}</strong></td>
                  <td>{transaction.quantity}</td>
                  <td>{formatINR(transaction.executionPrice)}</td>
                  <td>{formatINR(transaction.totalValue)}</td>
                  <td>{new Date(transaction.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="tiny-note">Only successful trades are recorded. All prices and transactions are simulated for learning.</p>
    </section>
  )
}

export default Transactions
