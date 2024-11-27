import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import BookDetails from "./pages/BookDetails";
import AdminProfile from "./pages/AdminProfile";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import TermsAndConditions from "./components/TermsAndConditions";
import Loading from "./components/Loading"; // Importa el componente Loading
import { CartProvider } from "./context/CartContext";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga para inicializar la aplicación
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer); // Limpia el timeout al desmontar
  }, []);

  if (isLoading) {
    return <Loading />; // Muestra el Loading mientras isLoading es verdadero
  }

  return (
    <CartProvider>
      <Router>
        <div
          style={{
            backgroundColor: "#F5E9DA",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Navbar isLoggedIn={true} onLogout={() => alert("Cierre de sesión realizado")} />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/profile/admin" element={<AdminProfile />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<TermsAndConditions />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;

