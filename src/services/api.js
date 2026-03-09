const BASE_URL = "http://localhost:3000/api";

const getToken = () => localStorage.getItem("token");

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error ${response.status}`);
  }

  return response.json();
};

// Auth
export const loginRequest = (nombreUsuario, password) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ nombreUsuario, password }),
  });

// Admin
export const getPropietarios = () => request("/admin/propietarios");
export const getUsuarios     = () => request("/admin/usuarios");
export const getConductores  = () => request("/admin/conductores");