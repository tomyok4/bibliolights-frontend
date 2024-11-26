import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar el carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (Array.isArray(storedCart)) {
      setCart(storedCart);
    } else {
      setCart([]);
    }
  }, []);

  // Guardar el carrito en localStorage solo cuando cambia
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Función para agregar un libro al carrito
  const addToCart = (book) => {
    // Verificamos si el libro ya está en el carrito antes de añadirlo
    const bookExists = cart.some((item) => item._id === book._id);
    if (!bookExists) {
      setCart((prevCart) => [...prevCart, book]);
    } else {
      alert('Este libro ya está en el carrito.');
    }
  };

  // Función para eliminar un libro del carrito
  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== bookId));
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  return useContext(CartContext);
};
