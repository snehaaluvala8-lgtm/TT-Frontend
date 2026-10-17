const links = [
  { label: 'Overview', page: 'Dashboard', icon: '⌂' },
  { label: 'Learn', page: 'Learn', icon: '◎' },
  { label: 'Stocks', page: 'Stocks', icon: '↗' },
  { label: 'Portfolio', page: 'Portfolio', icon: '▤' },
  { label: 'Activity', page: 'Transactions', icon: '↻' },
]

function Navbar({ activePage, onNavigate, onLogout, username }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="/" aria-label="Candle Craft home">
        <span className="brand-mark" aria-hidden="true">C</span>
        <span>Candle Craft</span>
      </a>
      <div className="sidebar-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        {links.map(({ label, page, icon }) => (
          <button
            className={`nav-link${activePage === page ? ' active' : ''}`}
            type="button"
            key={page}
            onClick={() => onNavigate(page)}
            aria-current={activePage === page ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">{icon}</span>
            {label}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="profile-chip">
          <span className="avatar">{username.slice(0, 1).toUpperCase()}</span>
          <span className="profile-name">{username}</span>
        </div>
        <button className="logout-button" type="button" onClick={onLogout}>
          <span className="nav-icon" aria-hidden="true">↪</span> Sign out
        </button>
        <div className="sidebar-note">Learning the market, one step at a time.</div>
      </div>
    </aside>
  )
}

export default Navbar
