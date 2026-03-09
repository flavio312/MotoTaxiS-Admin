import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, fallback }) => {
  const { user } = useAuth();
  return user ? children : fallback;
};

export default ProtectedRoute;