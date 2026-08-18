import { createContext, useContext, useEffect, useState } from 'react';

const OrdersContext = createContext(null);
const STORAGE_KEY = 'smokebun_orders';

const DELIVERY_FEE = 3.5;
const TAX_RATE = 0.08;

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  // Simulates submitting an order + payment to a backend.
  // Returns the created order so the caller can redirect to its detail page.
  const placeOrder = ({ items, subtotal, shipping, payment }) => {
    const tax = subtotal * TAX_RATE;
    const total = subtotal + DELIVERY_FEE + tax;
    const order = {
      id: `SB-${Date.now().toString().slice(-8)}`,
      placedAt: new Date().toISOString(),
      status: 'Confirmed',
      items,
      shipping,
      payment: { method: payment.method, last4: payment.last4 || null },
      amounts: { subtotal, delivery: DELIVERY_FEE, tax, total },
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const getOrderById = (id) => orders.find((o) => o.id === id);

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, getOrderById }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);