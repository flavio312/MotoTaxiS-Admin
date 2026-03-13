import "./SidebarNav.css";

const navItems = [
  { id: "dashboard",    label: "Dashboard",    icon: "☰" },
  { id: "usuarios",     label: "Usuarios",     icon: "👥" },
  { id: "conductores",  label: "Conductores",  icon: "🚗" },
  { id: "vehiculos",    label: "Vehículos",    icon: "🚙" },
  { id: "servicios",    label: "Servicios",    icon: "📍" },
  { id: "evaluaciones", label: "Evaluaciones", icon: "📋" },
  { id: "autorizaciones", label: "Autorizaciones", icon: "✅" },
];

const SidebarNav = ({ active, onSelect }) => {
  return (
    <nav className="sidebar-nav">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`sidebar-nav__item ${active === item.id ? "sidebar-nav__item--active" : ""}`}
        >
          <span className="sidebar-nav__icon">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default SidebarNav;