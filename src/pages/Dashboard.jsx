import { useEffect, useState } from 'react'
import { api, formatINR } from '../services/api.js'

function Dashboard({ onNavigate }) {
  const [portfolio, setPortfolio] = useState(null)
  const [stocks, setStocks] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.portfolio(), api.stocks()])
      .then(([account, availableStocks]) => {
        setPortfolio(account)
        setStocks(availableStocks.slice(0, 4))
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading-card">Preparing your learning dashboard…</div>
  if (error) return <div className="form-alert error" role="alert">{error}</div>

  const profitClass = portfolio.unrealizedProfitLoss >= 0 ? 'positive' : 'negative'

  return (
    <div className="page-stack">
      <section className="welcome-panel">
        <div>
          <span className="eyebrow">YOUR PRACTICE SPACE</span>
          <h2>A little learning goes a long way.</h2>
          <p>Explore the basics, then try a paper trade when you feel ready.</p>
        </div>
        <button className="button button-light" type="button" onClick={() => onNavigate('Learn')}>Start a lesson <span aria-hidden="true">→</span></button>
        <div className="welcome-decoration" aria-hidden="true"><span>↗</span><span>₹</span></div>
      </section>

      <section className="stat-grid" aria-label="Account summary">
        <article className="stat-card">
          <span className="stat-label">AVAILABLE VIRTUAL CASH</span>
          <strong>{formatINR(portfolio.availableBalance)}</strong>
          <span className="stat-caption">Ready for simulated trades</span>
        </article>
        <article className="stat-card">
          <span className="stat-label">TOTAL PORTFOLIO VALUE</span>
          <strong>{formatINR(portfolio.totalPortfolioValue)}</strong>
          <span className="stat-caption">Cash plus current holding values</span>
        </article>
        <article className="stat-card">
          <span className="stat-label">UNREALISED P&amp;L</span>
          <strong className={profitClass}>{formatINR(portfolio.unrealizedProfitLoss)}</strong>
          <span className="stat-caption">Change on your open holdings</span>
        </article>
      </section>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-heading">
            <div><span className="eyebrow">YOUR POSITIONS</span><h2>Portfolio snapshot</h2></div>
            <button className="text-button" type="button" onClick={() => onNavigate('Portfolio')}>View portfolio →</button>
          </div>
          {portfolio.holdings.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">▤</span>
              <h3>Your portfolio is ready when you are</h3>
              <p>Choose a simulated stock and practise your first trade.</p>
              <button className="button button-outline" type="button" onClick={() => onNavigate('Stocks')}>Explore stocks</button>
            </div>
          ) : (
            <div className="holding-list">
              {portfolio.holdings.slice(0, 5).map((holding) => (
                <div className="holding-row" key={holding.symbol}>
                  <span className="stock-avatar">{holding.symbol.slice(0, 1)}</span>
                  <div className="holding-name"><strong>{holding.symbol}</strong><small>{holding.quantity} units</small></div>
                  <div className="holding-value"><strong>{formatINR(holding.holdingValue)}</strong><small className={holding.unrealizedProfitLoss >= 0 ? 'positive' : 'negative'}>{formatINR(holding.unrealizedProfitLoss)}</small></div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="panel market-panel">
          <div className="panel-heading">
            <div><span className="eyebrow">GETTING STARTED</span><h2>Stocks to explore</h2></div>
            <button className="text-button" type="button" onClick={() => onNavigate('Stocks')}>All stocks →</button>
          </div>
          <div className="stock-list">
            {stocks.map((stock) => (
              <button className="stock-row" key={stock.symbol} type="button" onClick={() => onNavigate('Stocks')}>
                <span className="stock-avatar">{stock.symbol.slice(0, 1)}</span>
                <span className="stock-name"><strong>{stock.symbol}</strong><small>{stock.companyName}</small></span>
                <strong className="stock-quote">{formatINR(stock.currentPrice)}</strong>
              </button>
            ))}
          </div>
          <p className="tiny-note">Prices are simulated educational values, not live quotes.</p>
        </section>
      </div>

      <section className="learn-banner">
        <span className="learn-banner-icon" aria-hidden="true">✳</span>
        <div><strong>New to investing?</strong><p>Start with a short lesson on the basics of the stock market.</p></div>
        <button className="text-button" type="button" onClick={() => onNavigate('Learn')}>Visit Learn →</button>
      </section>
    </div>
  )
}

export default Dashboard
