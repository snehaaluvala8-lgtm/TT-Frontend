import { useEffect, useState } from 'react'
import TradeForm from '../components/TradeForm.jsx'
import { api, formatINR } from '../services/api.js'

function Portfolio({ onTradeDone }) {
  const [portfolio, setPortfolio] = useState(null)
  const [stocks, setStocks] = useState([])
  const [symbol, setSymbol] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const loadPortfolio = () => api.portfolio().then(setPortfolio)

  useEffect(() => {
    Promise.all([api.portfolio(), api.stocks()])
      .then(([account, availableStocks]) => {
        setPortfolio(account)
        setStocks(availableStocks)
        setSymbol(availableStocks[0]?.symbol || '')
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading-card">Loading your portfolio…</div>
  if (error) return <div className="form-alert error" role="alert">{error}</div>

  return (
    <div className="page-stack">
      <section className="portfolio-overview">
        <article><span>AVAILABLE CASH</span><strong>{formatINR(portfolio.availableBalance)}</strong></article>
        <article><span>HOLDINGS VALUE</span><strong>{formatINR(portfolio.totalHoldingsValue)}</strong></article>
        <article><span>TOTAL PORTFOLIO VALUE</span><strong>{formatINR(portfolio.totalPortfolioValue)}</strong></article>
        <article><span>UNREALISED P&amp;L</span><strong className={portfolio.unrealizedProfitLoss >= 0 ? 'positive' : 'negative'}>{formatINR(portfolio.unrealizedProfitLoss)}</strong></article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div><span className="eyebrow">YOUR POSITIONS</span><h2>Current holdings</h2></div>
          <span className="count-pill">{portfolio.holdings.length} holdings</span>
        </div>
        {portfolio.holdings.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">▤</span>
            <h3>No holdings yet</h3>
            <p>When you make a simulated BUY trade, your positions will appear here.</p>
          </div>
        ) : (
          <div className="responsive-table">
            <table>
              <thead><tr><th>STOCK</th><th>UNITS</th><th>AVG. PRICE</th><th>SIMULATED PRICE</th><th>HOLDING VALUE</th><th>UNREALISED P&amp;L</th></tr></thead>
              <tbody>
                {portfolio.holdings.map((holding) => (
                  <tr key={holding.symbol}>
                    <td><strong>{holding.symbol}</strong><small className="table-subtitle">{holding.companyName}</small></td>
                    <td>{holding.quantity}</td>
                    <td>{formatINR(holding.averagePurchasePrice)}</td>
                    <td>{formatINR(holding.currentPrice)}</td>
                    <td>{formatINR(holding.holdingValue)}</td>
                    <td className={holding.unrealizedProfitLoss >= 0 ? 'positive' : 'negative'}>{formatINR(holding.unrealizedProfitLoss)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {stocks.length > 0 && (
        <section className="trade-practice-section">
          <div>
            <span className="eyebrow">READY TO PRACTISE?</span>
            <h2>Place a paper trade</h2>
            <p>Trades update your virtual cash and holdings. They do not reach an exchange.</p>
            <label className="stock-select-label">
              Choose a stock
              <select value={symbol} onChange={(event) => setSymbol(event.target.value)}>
                {stocks.map((stock) => <option value={stock.symbol} key={stock.symbol}>{stock.symbol} · {stock.companyName}</option>)}
              </select>
            </label>
          </div>
          {stocks.find((stock) => stock.symbol === symbol) && (
            <TradeForm
              key={symbol}
              symbol={symbol}
              price={stocks.find((stock) => stock.symbol === symbol).currentPrice}
              onTradeDone={() => {
                loadPortfolio().then(onTradeDone).catch((requestError) => setError(requestError.message))
              }}
            />
          )}
        </section>
      )}
    </div>
  )
}

export default Portfolio
