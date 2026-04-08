import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../../services/api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    window.location.href = "/";
  }

  useEffect(() => {
    const token    = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try{
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          logout();
        }else{
          setUser(JSON.parse(userData));
          const timeout = (decoded.exp - now) * 1000;
          setTimeout(logout, timeout);
        }
      }catch(error){
        logout();
      }
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

    const decoded = jwtDecode(data.token);
    const now = Date.now() / 1000;
    const timeout = (decoded.exp - now) * 1000;
    setTimeout(logout, timeout);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);