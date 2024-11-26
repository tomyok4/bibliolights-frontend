import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('5 días');
  const [user, setUser] = useState(null); // Estado para manejar el usuario
  const navigate = useNavigate();

  // Verificar el usuario al cargar el componente
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

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
    if (cart.length === 0) {
      alert('El carrito está vacío. No se puede finalizar la orden.');
      return;
    }

    const token = localStorage.getItem('token');

    if (!user || !token) {
      alert('Debe iniciar sesión para realizar una compra.');
      navigate('/login');
      return;
    }

    // Simulación de procesamiento
    clearCart();
    alert('¡Gracias por tu compra!');
    navigate('/profile');
  };

  const handleProfileClick = () => {
    if (user?.isAdmin) {
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
        {user ? (
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
