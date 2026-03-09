import { useState } from "react";
import "./TopBar.css";
import { useAuth } from "../context/AuthContext";

const TopBar = ({ title }) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <h1 className="topbar__title">⊕ {title}</h1>
      <div className="topbar__user">
        <button className="topbar__user-btn" onClick={() => setOpen(o => !o)}>
          <div className="topbar__avatar">👤</div>
          <span className="topbar__username">{user?.username || "Admin"}</span>
          <span className="topbar__caret">▾</span>
        </button>
        {open && (
          <div className="topbar__dropdown">
            <button
              className="topbar__dropdown-item"
              onClick={() => { logout(); setOpen(false); }}
            >
              🚪 Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;