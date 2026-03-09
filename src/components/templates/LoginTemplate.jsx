import "./LoginTemplate.css";
import LoginCard from "../organisms/LoginCard";

const LoginTemplate = ({ onSuccess }) => {
  return (
    <div className="login-template">
      <div className="login-template__left">
        <LoginCard onSuccess={onSuccess} />
      </div>
      <div className="login-template__right">
        <img src="./moto.png" alt="MotoTaxi Seguro" />
        <p className="login-template__brand-desc">
          Plataforma administrativa de gestión de viajes seguros
        </p>
      </div>
    </div>
  );
};

export default LoginTemplate;