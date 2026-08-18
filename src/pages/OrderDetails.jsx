import { Link, useParams } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext.jsx';
import { formatCurrency } from '../utils/formatCurrency.js';
import './OrderDetails.css';

export default function OrderDetails() {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <section className="container order-details-empty">
        <h1>Order not found</h1>
        <p>We couldn't find an order with that ID.</p>
        <Link to="/my-orders" className="btn btn-primary">Back to My Orders</Link>
      </section>
    );
  }

  const placedDate = new Date(order.placedAt);

  return (
    <section className="container order-details">
      <Link to="/my-orders" className="order-details__back">← Back to My Orders</Link>
      <div className="order-details__header">
        <div>
          <p className="eyebrow">Order {order.id}</p>
          <h1>Order Details</h1>
        </div>
        <span className={`status-badge status-badge--${order.status.toLowerCase()}`}>{order.status}</span>
      </div>

      <div className="order-details__grid">
        <div className="order-details__main">
          <div className="order-details__card">
            <h3>Items</h3>
            <ul className="order-details__items">
              {order.items.map((line) => (
                <li key={line.lineId}>
                  <div>
                    <span className="order-details__item-name">{line.quantity}× {line.name}</span>
                    {line.customizations.length > 0 && (
                      <span className="order-details__item-custom"> — {line.customizations.join(', ')}</span>
                    )}
                  </div>
                  <span className="price">{formatCurrency(line.price * line.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="order-details__totals">
              <div><span>Subtotal</span><span className="price">{formatCurrency(order.amounts.subtotal)}</span></div>
              <div><span>Delivery</span><span className="price">{formatCurrency(order.amounts.delivery)}</span></div>
              <div><span>Tax</span><span className="price">{formatCurrency(order.amounts.tax)}</span></div>
              <div className="order-details__total-row"><span>Total</span><span className="price">{formatCurrency(order.amounts.total)}</span></div>
            </div>
          </div>
        </div>

        <aside className="order-details__side">
          <div className="order-details__card">
            <h3>Timeline</h3>
            <p className="order-details__meta">Placed on {placedDate.toLocaleDateString()} at {placedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>

          <div className="order-details__card">
            <h3>Payment</h3>
            <p className="order-details__meta">{order.payment.method}{order.payment.last4 ? ` ending in ${order.payment.last4}` : ''}</p>
          </div>

          <div className="order-details__card">
            <h3>Shipping to</h3>
            <p className="order-details__meta">
              {order.shipping.fullName}<br />
              {order.shipping.address}<br />
              {order.shipping.city}, {order.shipping.state}<br />
              {order.shipping.country} {order.shipping.zip}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}