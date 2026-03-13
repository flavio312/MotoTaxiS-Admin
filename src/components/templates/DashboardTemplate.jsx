import { useState } from "react";
import "./DashboardTemplate.css";
import Sidebar from "../organisms/Sidebar";
import TopBar from "../organisms/TopBar";
import DashboardContent from "../organisms/DashboardContent";
import PropietariosContent from "../organisms/PropietariosContent";
import UsuariosContent from "../organisms/UsuariosContent";
import ConductoresContent from "../organisms/ConductoresContent";
import VehiculosContent from "../organisms/VehiculosContent";
import ServiciosContent from "../organisms/ServiciosContent";
import AutorizacionContent from "../organisms/AutorizacionContent";

const pageTitles = {
  dashboard:    "Panel administrativo",
  usuarios:     "Usuarios",
  propietarios: "Propietarios",
  conductores:  "Conductores",
  vehiculos:    "Vehículos",
  servicios:    "Servicios",
  evaluaciones: "Evaluaciones",
  autorizaciones: "Autorizaciones"
};

const DashboardTemplate = () => {
  const [active, setActive] = useState("dashboard");

  const renderContent = () => {
    switch (active) {
      case "dashboard":    return <DashboardContent />;
      case "usuarios":     return <UsuariosContent />;
      case "propietarios": return <PropietariosContent />;
      case "conductores":  return <ConductoresContent />;
      case "vehiculos":    return <VehiculosContent />;
      case "servicios":    return <ServiciosContent />;
      case "autorizaciones": return <AutorizacionContent />;
      default:
        return (
          <div className="dashboard-template__placeholder">
            <span className="dashboard-template__placeholder-icon">🚧</span>
            <p className="dashboard-template__placeholder-text">
              Sección <span>{active}</span> en construcción
            </p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-template">
      <Sidebar active={active} onSelect={setActive} />
      <div className="dashboard-template__body">
        <TopBar title={pageTitles[active]} />
        <main className="dashboard-template__main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardTemplate;