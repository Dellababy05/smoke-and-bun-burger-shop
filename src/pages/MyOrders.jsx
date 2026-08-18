import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext.jsx';
import { formatCurrency } from '../utils/formatCurrency.js';
import './MyOrders.css';

const statusClass = (status) => `status-badge status-badge--${status.toLowerCase()}`;

export default function MyOrders() {
  const { orders } = useOrders();

  return (
    <section className="container orders-page">
      <h1>My Orders</h1>
      <div className="stack-divider" aria-hidden="true">
        <span className="bun-top" /><span className="patty" /><span className="bun-bottom" />
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <p>No orders yet — once you check out, they'll show up here.</p>
          <Link to="/menu" className="btn btn-primary">Start an Order</Link>
        </div>
      ) : (
        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Date</th>
                <th>Items</th>
                <th>Status</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="orders-table__id">{order.id}</td>
                  <td>{new Date(order.placedAt).toLocaleDateString()}</td>
                  <td>{order.items.reduce((n, i) => n + i.quantity, 0)} items</td>
                  <td><span className={statusClass(order.status)}>{order.status}</span></td>
                  <td className="price">{formatCurrency(order.amounts.total)}</td>
                  <td>
                    <Link to={`/my-orders/${order.id}`} className="orders-table__link">
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}