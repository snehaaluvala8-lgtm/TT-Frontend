import { useEffect, useState } from 'react'
import TradeForm from '../components/TradeForm.jsx'
import { api, formatINR } from '../services/api.js'

function Stocks({ onTradeDone }) {
  const [stocks, setStocks] = useState([])
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.stocks()
      .then((items) => {
        setStocks(items)
        setSelected(items[0] || null)
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [])

  const visibleStocks = stocks.filter((stock) =>
    `${stock.symbol} ${stock.companyName}`.toLowerCase().includes(search.toLowerCase()),
  )

  if (loading) return <div className="loading-card">Loading simulated stock list…</div>
  if (error) return <div className="form-alert error" role="alert">{error}</div>

  return (
    <div className="stocks-layout">
      <section className="panel stock-browser">
        <div className="panel-heading">
          <div><span className="eyebrow">SIMULATED MARKET</span><h2>Browse stocks</h2></div>
          <span className="count-pill">{stocks.length} companies</span>
        </div>
        <label className="search-field">
          <span aria-hidden="true">⌕</span>
          <span className="sr-only">Search stocks</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by company or symbol" />
        </label>
        <div className="stock-table">
          <div className="table-header"><span>COMPANY</span><span>PRICE</span></div>
          {visibleStocks.map((stock) => (
            <button
              className={`stock-table-row${selected?.symbol === stock.symbol ? ' selected' : ''}`}
              type="button"
              key={stock.symbol}
              onClick={() => setSelected(stock)}
            >
              <span className="stock-table-name"><span className="stock-avatar">{stock.symbol.slice(0, 1)}</span><span><strong>{stock.symbol}</strong><small>{stock.companyName}</small></span></span>
              <strong>{formatINR(stock.currentPrice)}</strong>
            </button>
          ))}
          {visibleStocks.length === 0 && <div className="empty-inline">No stocks match that search.</div>}
        </div>
        <p className="tiny-note">Displayed prices are predefined educational values and may not match real markets.</p>
      </section>
      <aside className="stock-detail-column">
        {selected && (
          <>
            <section className="stock-detail-card">
              <span className="eyebrow">STOCK DETAILS</span>
              <span className="detail-avatar">{selected.symbol.slice(0, 1)}</span>
              <h2>{selected.companyName}</h2>
              <span className="detail-symbol">{selected.symbol}</span>
              <strong className="detail-price">{formatINR(selected.currentPrice)}</strong>
              <span className="simulated-label"><span /> Simulated price</span>
              <p>{selected.priceType}</p>
            </section>
            <TradeForm
              key={selected.symbol}
              symbol={selected.symbol}
              price={selected.currentPrice}
              onTradeDone={onTradeDone}
            />
          </>
        )}
      </aside>
    </div>
  )
}

export default Stocks
