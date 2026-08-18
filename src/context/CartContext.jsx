import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'smokebun_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist on every change so a refresh doesn't wipe the cart.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // A "line" is unique per item + chosen customizations, so the same burger
  // ordered two different ways shows as two separate rows.
  const makeLineId = (id, customizations) => `${id}::${[...customizations].sort().join('|')}`;

  const addItem = (menuItem, quantity = 1, customizations = []) => {
    const lineId = makeLineId(menuItem.id, customizations);
    setItems((prev) => {
      const existing = prev.find((line) => line.lineId === lineId);
      if (existing) {
        return prev.map((line) =>
          line.lineId === lineId ? { ...line, quantity: line.quantity + quantity } : line
        );
      }
      return [
        ...prev,
        {
          lineId,
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          image: menuItem.image,
          customizations,
          quantity,
        },
      ];
    });
  };

  const updateQuantity = (lineId, quantity) => {
    if (quantity < 1) return removeItem(lineId);
    setItems((prev) => prev.map((line) => (line.lineId === lineId ? { ...line, quantity } : line)));
  };

  const removeItem = (lineId) => setItems((prev) => prev.filter((line) => line.lineId !== lineId));

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const itemCount = items.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, subtotal, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);