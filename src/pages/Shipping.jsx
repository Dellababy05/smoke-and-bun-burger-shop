import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { countries, getStatesForCountry } from '../data/locationData.js';
import { useCart } from '../context/CartContext.jsx';
import { useOrders } from '../context/OrdersContext.jsx';
import Modal from '../components/Modal.jsx';
import './Shipping.css';
import { formatCurrency } from '../utils/formatCurrency.js';

const INITIAL_FORM = {
  fullName: '',
  address: '',
  city: '',
  country: '',
  state: '',
  zip: '',
  cardNumber: '',
  cardExpiry: '',
};

export default function Shipping() {
  const { items, subtotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const availableStates = getStatesForCountry(form.country);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: value,
      // Reset state selection any time the country changes.
      ...(field === 'country' ? { state: '' } : {}),
    }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Required';
    if (!form.address.trim()) next.address = 'Required';
    if (!form.city.trim()) next.city = 'Required';
    if (!form.country) next.country = 'Select a country';
    if (!form.state) next.state = 'Select a state';
    if (!/^\d{4,10}$/.test(form.zip)) next.zip = 'Enter a valid postal code';
    if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) next.cardNumber = 'Enter a 16-digit card number';
    if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) next.cardExpiry = 'Use MM/YY format';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    // Simulated payment + order placement — no real card data is transmitted.
    const order = placeOrder({
      items,
      subtotal,
      shipping: {
        fullName: form.fullName,
        address: form.address,
        city: form.city,
        country: form.country,
        state: form.state,
        zip: form.zip,
      },
      payment: { method: 'Card', last4: form.cardNumber.replace(/\s/g, '').slice(-4) },
    });

    setConfirmedOrder(order);
    clearCart();
  };

  return (
    <section className="container shipping-page">
      <h1>Shipping &amp; Payment</h1>
      <div className="stack-divider" aria-hidden="true">
        <span className="bun-top" /><span className="patty" /><span className="bun-bottom" />
      </div>

      {items.length === 0 && !confirmedOrder ? (
        <p className="shipping-empty">Your cart is empty — add items from the menu before checking out.</p>
      ) : (
        <form className="shipping-form" onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Delivery Address</legend>
            <div className="form-field">
              <label htmlFor="fullName">Full name</label>
              <input id="fullName" value={form.fullName} onChange={handleChange('fullName')} />
              {errors.fullName && <span className="form-error">{errors.fullName}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="address">Street address</label>
              <input id="address" value={form.address} onChange={handleChange('address')} />
              {errors.address && <span className="form-error">{errors.address}</span>}
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="city">City</label>
                <input id="city" value={form.city} onChange={handleChange('city')} />
                {errors.city && <span className="form-error">{errors.city}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="zip">Postal code</label>
                <input id="zip" value={form.zip} onChange={handleChange('zip')} />
                {errors.zip && <span className="form-error">{errors.zip}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="country">Country</label>
                <select id="country" value={form.country} onChange={handleChange('country')}>
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
                {errors.country && <span className="form-error">{errors.country}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="state">State / Province</label>
                <select id="state" value={form.state} onChange={handleChange('state')} disabled={!form.country}>
                  <option value="">Select state</option>
                  {availableStates.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && <span className="form-error">{errors.state}</span>}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Payment</legend>
            <div className="form-field">
              <label htmlFor="cardNumber">Card number</label>
              <input id="cardNumber" placeholder="4242 4242 4242 4242" value={form.cardNumber} onChange={handleChange('cardNumber')} />
              {errors.cardNumber && <span className="form-error">{errors.cardNumber}</span>}
            </div>
            <div className="form-field form-field--short">
              <label htmlFor="cardExpiry">Expiry (MM/YY)</label>
              <input id="cardExpiry" placeholder="08/29" value={form.cardExpiry} onChange={handleChange('cardExpiry')} />
              {errors.cardExpiry && <span className="form-error">{errors.cardExpiry}</span>}
            </div>
            <p className="shipping-form__note">This is a demo checkout — no real payment is processed.</p>
          </fieldset>

          <button type="submit" className="btn btn-primary shipping-form__submit">
            Confirm &amp; Pay {formatCurrency(subtotal)}
          </button>
        </form>
      )}

      <Modal open={!!confirmedOrder} onClose={() => navigate('/my-orders')} title="Order confirmed! 🎉">
        {confirmedOrder && (
          <>
            <p>Order <strong>{confirmedOrder.id}</strong> is on the grill. We'll text you updates.</p>
            <button
              className="btn btn-primary"
              style={{ marginTop: 18 }}
              onClick={() => navigate(`/my-orders/${confirmedOrder.id}`)}
            >
              View Order Details
            </button>
          </>
        )}
      </Modal>
    </section>
  );
}