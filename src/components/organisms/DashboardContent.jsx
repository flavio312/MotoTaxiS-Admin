import { useCallback } from "react";
import "./DashboardContent.css";
import StatCard from "../atoms/StatCard";
import BarChart from "../molecules/BarChart";
import useFetch from "../../hooks/useFetch";
import { getUsuarios } from "../../services/api";

const DashboardContent = () => {
  const fetcher = useCallback(getUsuarios, []);
  const { data: usuarios, loading: loadingUsuarios } = useFetch(fetcher);

  return (
    <div className="dashboard">
      <h2 className="dashboard__title">Dashboard</h2>

      <div className="dashboard__stats">
        <StatCard
          icon="👤"
          value={loadingUsuarios ? "..." : usuarios.length}
          label="Usuarios totales"
          color="blue"
        />
        <StatCard icon="🚗" value="24"  label="Servicios activos" color="amber"  />
        <StatCard icon="🛺" value="24"  label="Viajes en curso"   color="green"  />
        <StatCard icon="🚙" value="24"  label="Vehículos activos" color="purple" />
      </div>

      <div className="dashboard__chart-card">
        <p className="dashboard__chart-title">Estadísticas</p>
        <p className="dashboard__chart-subtitle">Servicios mensuales</p>
        <BarChart />
      </div>
    </div>
  );
};

export default DashboardContent;