import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import './MenuCard.css';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function MenuCard({ item }) {
  const { addItem } = useCart();
  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState([]);
  const [justAdded, setJustAdded] = useState(false);

  const toggleCustomization = (option) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleAdd = () => {
    addItem(item, quantity, selected);
    setJustAdded(true);
    setExpanded(false);
    setQuantity(1);
    setSelected([]);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <article className="menu-card">
      <div className="menu-card__image-wrap">
        <img src={item.image} alt={item.name} loading="lazy" />
        <span className="menu-card__category">{item.category}</span>
      </div>

      <div className="menu-card__body">
        <div className="menu-card__title-row">
          <h3>{item.name}</h3>
          <span className="price">{formatCurrency(item.price)}</span>
        </div>
        <p className="menu-card__desc">{item.description}</p>

        {expanded && item.customizations.length > 0 && (
          <fieldset className="menu-card__customize">
            <legend>Customize</legend>
            {item.customizations.map((option) => (
              <label key={option} className="menu-card__option">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleCustomization(option)}
                />
                {option}
              </label>
            ))}
          </fieldset>
        )}

        <div className="menu-card__footer">
          <div className="qty-stepper">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <span>{quantity}</span>
            <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}>
              +
            </button>
          </div>

          {item.customizations.length > 0 && (
            <button type="button" className="menu-card__customize-toggle" onClick={() => setExpanded((v) => !v)}>
              {expanded ? 'Hide options' : 'Customize'}
            </button>
          )}

          <button type="button" className="btn btn-primary menu-card__add" onClick={handleAdd}>
            {justAdded ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
}