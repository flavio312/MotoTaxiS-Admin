import "./LoginCard.css";
import LoginForm from "../molecules/LoginForm";

const LoginCard = ({ onSuccess }) => {
  return (
    <div className="login-card">
      <div className="login-card__header">
        <img src="./jaguar.png" alt="Cabeza de Jaguar" />
        <h1 className="login-card__title">Inicio de sesión</h1>
        <p className="login-card__subtitle">Panel Administrativo · ViajeSeguro</p>
      </div>
      <LoginForm onSuccess={onSuccess} />
      <p className="login-card__footer">© 2026 MotoTaxi Seguro · Todos los derechos reservados</p>
    </div>
  );
};

export default LoginCard;