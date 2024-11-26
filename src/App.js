import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Dashboard from './pages/Dashboard';
import BookDetails from './pages/BookDetails';
import AdminProfile from './pages/AdminProfile';  // Perfil de admin
import { CartProvider } from './context/CartContext'; 

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div style={{ backgroundColor: '#F5E9DA', minHeight: '100vh' }}>
          {/* Navbar */}
          <Navbar isLoggedIn={true} onLogout={() => alert('Logout realizado')} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/profile/admin" element={<AdminProfile />} />  {/* Ruta para perfil de admin */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;