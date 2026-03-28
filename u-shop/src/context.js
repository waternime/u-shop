import React, { createContext, useContext, useMemo, useState } from 'react';
import { products } from './data';

const ShopContext = createContext();

const generateTransactionId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let result = '';

  for (let i = 0; i < 3; i++) {
    result += letters[Math.floor(Math.random() * letters.length)];
  }

  for (let i = 0; i < 3; i++) {
    result += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return result;
};

export function ShopProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  const isDark = theme === 'dark';

  const colors = isDark
  ? {
      background: '#4c5661',
      card: '#2f3941',
      text: '#ffffff',
      subText: '#d9d9d9',
      border: '#03060a',
      topBar: '#4c5661',
      panel: '#111111',
      accent: '#16f23d',
      input: '#2b3138',
      sliderBg: '#1a1a1a',
      drawerBg: '#111111',
    }
  : {
      background: '#d9d9d9',
      card: '#ffffff',
      text: '#111111',
      subText: '#444444',
      border: '#b9b9b9',
      topBar: '#18dfe2',
      panel: '#18dfe2',
      accent: '#16f23d',
      input: '#e7efe1',
      sliderBg: '#eeeeee',
      drawerBg: '#2f3941',
    };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const moveWishlistToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const increaseQty = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const checkout = () => {
    if (cart.length === 0) return;

    const transaction = {
      id: generateTransactionId(),
      date: new Date().toISOString(),
      items: cart,
      total: totalPrice,
    };

    setHistory((prev) => [transaction, ...prev]);
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        wishlist,
        cart,
        history,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        moveWishlistToCart,
        increaseQty,
        decreaseQty,
        checkout,
        cartCount,
        totalPrice,
        isDark,
        toggleTheme,
        colors,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}