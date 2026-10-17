const lessons = [
  { number: '01', title: 'Learn the language', text: 'Start with simple lessons on shares, prices, risk, and how markets work.' },
  { number: '02', title: 'Explore simulated stocks', text: 'Browse familiar companies with clearly labelled educational prices.' },
  { number: '03', title: 'Practise at your pace', text: 'Try paper BUY and SELL trades using virtual cash—never real money.' },
]

function Landing({ onLogin, onRegister }) {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <a className="brand" href="#home" aria-label="Candle Craft home">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>Candle Craft</span>
        </a>
        <nav className="landing-nav" aria-label="Landing page navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#learn">What you’ll learn</a>
        </nav>
        <div className="landing-actions">
          <button className="landing-login" type="button" onClick={onLogin}>Sign in</button>
          <button className="button button-primary" type="button" onClick={onRegister}>Get started <span aria-hidden="true">→</span></button>
        </div>
      </header>

      <section className="landing-hero" id="home">
        <div className="landing-hero-copy">
          <span className="landing-kicker"><span /> A CALMER WAY TO START LEARNING</span>
          <h1>Learn the market.<br /><span>Practise with confidence.</span></h1>
          <p>Build your understanding of stocks and paper trading through simple lessons and a safe virtual portfolio. No real money. No pressure.</p>
          <div className="landing-hero-actions">
            <button className="button button-primary landing-cta" type="button" onClick={onRegister}>Create your free account <span aria-hidden="true">→</span></button>
            <a className="landing-text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
          </div>
          <div className="landing-trust">
            <span className="trust-icon" aria-hidden="true">✓</span>
            <span>Practice with <strong>₹50,000 virtual cash</strong></span>
            <span className="trust-divider" />
            <span>For learning only</span>
          </div>
        </div>

        <div className="landing-visual" aria-label="Illustration of a simulated portfolio">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="portfolio-preview">
            <div className="preview-topline">
              <span className="preview-appmark">C</span>
              <span>Practice portfolio</span>
              <span className="preview-live"><i /> SIMULATED</span>
            </div>
            <div className="preview-label">TOTAL PRACTICE VALUE</div>
            <div className="preview-total">₹52,480<span>.00</span></div>
            <div className="preview-change"><span>↗</span> Learning by doing <small>· virtual only</small></div>
            <div className="chart-wrap">
              <div className="chart-ylabels"><span>₹55k</span><span>₹52k</span><span>₹49k</span><span>₹46k</span></div>
              <svg className="preview-chart" viewBox="0 0 420 150" role="img" aria-label="Decorative simulated portfolio chart">
                <defs>
                  <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#72a98a" stopOpacity=".22" />
                    <stop offset="100%" stopColor="#72a98a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 119 C24 115 28 98 52 104 S87 91 105 99 S131 71 156 80 S190 84 211 63 S250 71 270 56 S300 58 320 43 S351 51 370 27 S397 37 420 12 V150 H0Z" fill="url(#chartFill)" />
                <path d="M0 119 C24 115 28 98 52 104 S87 91 105 99 S131 71 156 80 S190 84 211 63 S250 71 270 56 S300 58 320 43 S351 51 370 27 S397 37 420 12" fill="none" stroke="#39785e" strokeWidth="3" strokeLinecap="round" />
                <circle cx="420" cy="12" r="5" fill="#39785e" stroke="white" strokeWidth="3" />
              </svg>
              <div className="chart-xlabels"><span>WEEK 1</span><span>WEEK 2</span><span>WEEK 3</span><span>WEEK 4</span></div>
            </div>
            <div className="preview-holdings">
              <span><i className="holding-dot dot-a" /> Sample holding</span>
              <strong>Practice, not prediction</strong>
            </div>
          </div>
          <div className="floating-note"><span>✳</span><div><strong>Start with the basics</strong><small>Short, beginner-friendly lessons</small></div></div>
          <div className="landing-leaf leaf-one" />
          <div className="landing-leaf leaf-two" />
        </div>
      </section>

      <div className="landing-disclaimer">
        <span className="disclaimer-star" aria-hidden="true">✳</span>
        <p><strong>A safe place to practise.</strong> Candle Craft is an educational simulator. Prices are predefined examples—not live quotes—and trades never reach a real exchange.</p>
      </div>

      <section className="landing-how" id="how-it-works">
        <div className="landing-section-heading">
          <span className="eyebrow">YOUR FIRST STEPS</span>
          <h2>Understand first. Practise second.</h2>
          <p>Explore stock market ideas in small steps, with a virtual portfolio to learn by doing.</p>
        </div>
        <div className="landing-steps">
          {lessons.map((item) => (
            <article className="landing-step" key={item.number}>
              <span className="step-number">{item.number}</span>
              <span className="step-connector" aria-hidden="true">↗</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-learn" id="learn">
        <div className="learn-illustration" aria-hidden="true">
          <div className="learn-orbit" />
          <div className="learn-book"><span>CC</span><i /><i /><i /></div>
          <span className="learn-spark spark-one">✳</span>
          <span className="learn-spark spark-two">✦</span>
        </div>
        <div className="landing-learn-copy">
          <span className="eyebrow">MADE FOR BEGINNERS</span>
          <h2>Market concepts,<br />without the jargon.</h2>
          <p>Learn what a stock is, why prices move, how gains and losses work, and why risk matters. Then check your understanding with a quick quiz.</p>
          <ul>
            <li><span>✓</span> Bite-sized explanations and examples</li>
            <li><span>✓</span> Learn about diversification and risk</li>
            <li><span>✓</span> No promises, predictions, or pressure</li>
          </ul>
          <button className="button button-outline" type="button" onClick={onRegister}>Start learning <span aria-hidden="true">→</span></button>
        </div>
      </section>

      <section className="landing-bottom-cta">
        <div className="cta-decoration" aria-hidden="true">C</div>
        <span className="eyebrow">YOUR LEARNING JOURNEY STARTS HERE</span>
        <h2>Take your first step—<br />there’s no real money at risk.</h2>
        <p>Get a virtual wallet, explore the lessons, and practise at your own pace.</p>
        <button className="button button-light" type="button" onClick={onRegister}>Create your account <span aria-hidden="true">→</span></button>
      </section>

      <footer className="landing-footer">
        <a className="brand" href="#home">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>Candle Craft</span>
        </a>
        <span>Learn thoughtfully. Practise safely.</span>
        <span>Educational simulator · Not financial advice</span>
      </footer>
    </main>
  )
}

export default Landing
