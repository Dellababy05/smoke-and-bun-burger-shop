import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import './Header.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand__mark">S&B</span>
          <span className="brand__name">Smoke &amp; Bun</span>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `main-nav__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          {user ? (
            <div className="header-actions__user">
              <NavLink to="/my-orders" className="header-actions__link">
                {user.name}
              </NavLink>
              <button className="btn btn-outline header-actions__logout" onClick={logout}>
                Log out
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="header-actions__link">
              Log in
            </NavLink>
          )}

          <Link to="/cart" className="cart-pill" aria-label={`Cart, ${itemCount} items`}>
            🛒 <span>{itemCount}</span>
          </Link>

          <button
            className="menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}