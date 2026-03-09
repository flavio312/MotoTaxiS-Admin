import { AuthProvider, useAuth } from "./components/context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import "./components/styles/global.css";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "#f3f4f6", fontSize: "24px"
      }}>
        ⏳
      </div>
    );
  }

  return user ? <DashboardPage /> : <LoginPage />;
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;