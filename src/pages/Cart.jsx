import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import './Cart.css';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <section className="container cart-empty">
        <h1>Your cart is empty</h1>
        <p>Looks like you haven't added anything yet — the grill's waiting.</p>
        <Link to="/menu" className="btn btn-primary">Browse the Menu</Link>
      </section>
    );
  }

  return (
    <section className="container cart-page">
      <h1>Your Cart</h1>
      <div className="stack-divider" aria-hidden="true">
        <span className="bun-top" /><span className="patty" /><span className="bun-bottom" />
      </div>

      <div className="cart-layout">
        <ul className="cart-list">
          {items.map((line) => (
            <li key={line.lineId} className="cart-line">
              <img src={line.image} alt={line.name} className="cart-line__image" />
              <div className="cart-line__info">
                <h3>{line.name}</h3>
                {line.customizations.length > 0 && (
                  <p className="cart-line__customizations">{line.customizations.join(', ')}</p>
                )}
                <button className="cart-line__remove" onClick={() => removeItem(line.lineId)}>
                  Remove
                </button>
              </div>
              <div className="qty-stepper">
                <button onClick={() => updateQuantity(line.lineId, line.quantity - 1)} aria-label="Decrease quantity">−</button>
                <span>{line.quantity}</span>
                <button onClick={() => updateQuantity(line.lineId, line.quantity + 1)} aria-label="Increase quantity">+</button>
              </div>
               <span className="price cart-line__price">{formatCurrency(line.price * line.quantity)}</span>
            </li>
          ))}
        </ul>

        <aside className="cart-summary">
          <h3>Order Summary</h3>
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span className="price">{formatCurrency(subtotal)}</span>
          </div>
          <p className="cart-summary__note">Delivery and tax are calculated at checkout.</p>
          <button className="btn btn-primary cart-summary__cta" onClick={() => navigate('/shipping')}>
            Proceed to Checkout
          </button>
          <Link to="/menu" className="cart-summary__continue">Continue shopping</Link>
        </aside>
      </div>
    </section>
  );
}