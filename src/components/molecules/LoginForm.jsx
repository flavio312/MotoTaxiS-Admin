import { useState } from "react";
import "./LoginForm.css";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { useAuth } from "../context/AuthContext";

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();
  const [nombreUsuario, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    const errs = {};
    if (!nombreUsuario.trim()) errs.nombreUsuario = "El nombre de usuario es requerido";
    if (!password.trim()) errs.password = "La contraseña es requerida";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await login(nombreUsuario, password);
      onSuccess?.();
    } catch (err) {
      setErrors({ general: err.message || "Credenciales incorrectas" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      {errors.general && (
        <div className="login-form__error">{errors.general}</div>
      )}
      <Input
        label="Usuario"
        value={nombreUsuario}
        onChange={e => { setUsername(e.target.value); setErrors(p => ({ ...p, nombreUsuario: "" })); }}
        placeholder="Ingresa tu usuario"
        error={errors.nombreUsuario}
      />
      <Input
        label="Contraseña"
        type="password"
        value={password}
        onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
        placeholder="••••••••"
        error={errors.password}
      />
      <Button onClick={handleSubmit} variant="primary" fullWidth disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </Button>
    </div>
  );
};

export default LoginForm;