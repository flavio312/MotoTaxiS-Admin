import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token    = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (nombreUsuario, contrasena) => {
    const data = await loginRequest(nombreUsuario, contrasena);
    if (data.rol !== "admin") {
      throw new Error("Solo los administradores pueden ingresar");
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({
      id:       data.idUsuario,
      username: data.nombreUsuario,
      rol:      data.rol,
    }));
    setUser({ id: data.idUsuario, username: data.nombreUsuario, rol: data.rol });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);