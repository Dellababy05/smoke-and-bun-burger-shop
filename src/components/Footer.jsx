import { Link } from 'react-router-dom';
import './Footer.css';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'IG' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'FB' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'TT' },
  { label: 'X', href: 'https://x.com', icon: 'X' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="footer-brand">
          <h3>Smoke &amp; Bun</h3>
          <p>Flame-grilled, hand-stacked burgers — made fresh, delivered fast.</p>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-socials__icon"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Account</h4>
          <Link to="/login">Log in / Register</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/my-orders">My Orders</Link>
        </div>

        <div className="footer-col">
          <h4>Visit</h4>
          <p>Rydsvägen 102B<br />Linköping, Sweden</p>
          <p>Open daily · 11am – 10pm</p>
        </div>
      </div>
      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Smoke &amp; Bun. All rights reserved.</p>
      </div>
    </footer>
  );
}