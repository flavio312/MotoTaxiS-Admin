import { useCallback } from "react";
import namer from "color-namer";
import DataTable from "../atoms/DataTable";
import useFetch from "../../hooks/useFetch";
import { getVehiculos } from "../../services/api";
import "../styles/pageSection.css";

const columns = [
  { key: "idVehiculo", label: "#" },
  { key: "inmatriculacion", label: "Inscripción" },
  { key: "fechaAdquisicion", label: "Fecha adquisición"},
  {
    key: "color",
    label: "Color",
    render: (val) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span 
          style={{ 
            backgroundColor: val, 
            width: "40px", 
            height: "20px", 
            borderRadius: "4px", 
            border: "1px solid #ccc" 
          }} 
        />
      </div>
    )
  },
  {
    key: "estado",
    label: "Estado",
    render: (val) => {            
      const activo = val === "activo" || val === true || val === 1;
      return (
        <span className={`badge ${activo ? "bg-success" : "bg-danger"}`}>
          {activo ? "Activo" : "Inactivo"}
        </span>
      );
    }
  },
  {
    key:"acciones", label: "Acciones", render: () => (
      <div className="actions">
        <button className="btn btn--small btn--blue">Editar</button>
        <button className="btn btn--small btn--red">Eliminar</button>
      </div>
    ),
  }
];

const VehiculosContent = () => {
    const fetcher = useCallback(getVehiculos, []);
    const { data, loading, error, refetch } = useFetch(fetcher);
    return(
        <div className="page-section">
            <div className="page-section__top">
                <div>
                    <h2 className="page-section__title">Vehículos</h2>
                    <p className="page-section__subtitle">Listado de vehículos registrados</p>
                </div>
            </div>
            <DataTable
                title="Vehículos"
                columns={columns}
                data={data}
                loading={loading}
                error={error}
                refetch={refetch}
            />
        </div>

    );
};

export default VehiculosContent;