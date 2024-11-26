import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { requestBook } from '../utils/api';  // Asegúrate de importar correctamente requestBook

import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('5 días');
  const navigate = useNavigate();

  const handleRemoveItem = (bookId) => {
    removeFromCart(bookId);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleDeliveryTimeChange = (event) => {
    setSelectedDeliveryTime(event.target.value);
  };

  const handleCheckout = async () => {
    // Check if cart is empty
    if (cart.length === 0) {
      alert('El carrito está vacío. No se puede finalizar la orden.');
      return;
    }

    // Check authentication
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !token) {
      alert('Debe iniciar sesión para realizar una compra.');
      navigate('/login');
      return;
    }

    try {
      // Process book requests for each item in the cart
      const requestPromises = cart.map(async (item) => {
        const notes = ""; // Keep original empty notes approach
        await requestBook(item._id, selectedDeliveryTime, notes);
      });

      // Wait for all book requests to complete
      await Promise.all(requestPromises);

      // Clear the cart after successful requests
      clearCart();

      // Show success message
      alert('¡Gracias por tu compra! Tus órdenes han sido procesadas.');

      // Navigate to profile or home page
      navigate('/profile');

    } catch (error) {
      console.error("Error al realizar la compra:", error);
      alert("Hubo un problema al realizar la compra. Intenta nuevamente.");
    }
  };

  const handleProfileClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.isAdmin) {
      navigate('/profile/admin');
    } else {
      navigate('/profile');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const toggleCartVisibility = () => {
    setIsCartVisible((prev) => !prev);
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button onClick={handleGoHome}>Inicio</button>
        {isLoggedIn ? (
          <button onClick={handleProfileClick}>Perfil</button>
        ) : (
          <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
        )}
      </div>
      <h1 className="navbar-center">BIBLIOLIGHTS</h1>
      <div className="navbar-right">
        <button className="cart-button" onClick={toggleCartVisibility}>
          <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          <span className="cart-count">{cart.length}</span>
        </button>
        {isCartVisible && (
          <div className="cart-dropdown visible">
            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <div key={item._id} className="cart-item">
                    <img src={item.coverImage} alt={item.title} className="cart-image" />
                    <div className="cart-details">
                      <span>{item.title}</span>
                      <span>${item.price.toFixed(2)}</span>
                      <button onClick={() => handleRemoveItem(item._id)}>Eliminar</button>
                    </div>
                  </div>
                ))}
                <div className="total">
                  <strong>Total: ${calculateTotal()}</strong>
                </div>

                <div className="delivery-time">
                  <label htmlFor="delivery-time">Selecciona tiempo de entrega:</label>
                  <select
                    id="delivery-time"
                    value={selectedDeliveryTime}
                    onChange={handleDeliveryTimeChange}
                  >
                    <option value="3 días">3 días</option>
                    <option value="5 días">5 días</option>
                    <option value="7 días">7 días</option>
                    <option value="10 días">10 días</option>
                  </select>
                </div>

                <button className="checkout-button" onClick={handleCheckout}>
                  Finalizar Orden
                </button>
              </>
            ) : (
              <p>El carrito está vacío</p>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
