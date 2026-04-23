
const BASE_URL = import.meta.env.VITE_BASE_URL || '';

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
export const getVehiculos    = () => request("/admin/vehiculos");
export const getServicios     = () => request("/admin/servicios");
export const deleteUser = (idUsuario) => 
  request(`/admin/usuarios/${idUsuario}`, { 
    method: "DELETE" 
});

// Autorizaciones
export const getAutorizacionPropietarios = () => request("/admin/autorizaciones/propietarios");
export const aprobarAutorizacionPropietarios = (idAutorizacion) => 
  request(`/admin/autorizaciones/propietarios/${idAutorizacion}/aprobar`, {
  method: "PUT"
});
export const rechazarAutorizacionPropietarios = (idAutorizacion) => 
  request(`/admin/autorizaciones/propietarios/${idAutorizacion}/rechazar`, {
  method: "PUT"
});