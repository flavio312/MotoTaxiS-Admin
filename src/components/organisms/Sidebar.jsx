import "./Sidebar.css";
import SidebarNav from "../molecules/SidebarNav";

const Sidebar = ({ active, onSelect }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-icon">🛺</div>
        <span className="sidebar__brand-name">ViajeSeguro</span>
      </div>
      <div className="sidebar__divider" />
      <SidebarNav active={active} onSelect={onSelect} />
    </aside>
  );
};

export default Sidebar;