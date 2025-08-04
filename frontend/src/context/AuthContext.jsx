import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
