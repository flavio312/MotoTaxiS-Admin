import LoginTemplate from "../components/templates/LoginTemplate";

const LoginPage = ({ onLoginSuccess }) => {
  return <LoginTemplate onSuccess={onLoginSuccess} />;
};

export default LoginPage;