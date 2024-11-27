import React, { useContext, createContext, useState } from "react";

// Crea el contexto de autenticación
const AuthContext = createContext();

// Hook para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Variable para administrar si el usuario es admin

  // Lógica para establecer el token y el estado de admin (esto lo puedes adaptar según tu lógica)
  const login = (newToken, adminStatus) => {
    setToken(newToken);
    setIsAdmin(adminStatus);
  };

  const logout = () => {
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Obtén el token de autenticación
export const GetAuthToken = () => {
  const { token } = useAuth();
  return token;
};

// Obtén el estado de administrador
export const GetIsAdmin = () => {
  const { isAdmin } = useAuth();
  return isAdmin;
};
