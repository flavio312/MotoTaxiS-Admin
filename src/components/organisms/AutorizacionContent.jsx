import { useCallback } from "react";
import DataTable from "../atoms/DataTable";
import useFetch from "../../hooks/useFetch";
import { getAutorizacionPropietarios } from "../../services/api";
import "../styles/pageSection.css";

const columns = [
  { key: "idPropietario", label: "#" },
  { key: "nombre", label: "Inscripción" },
  { key: "rfc", label: "Fecha adquisición"},
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

const AutorizacionContent = () => {
    const fetcher = useCallback(getAutorizacionPropietarios, []);
    const { data, loading, error, refetch } = useFetch(fetcher);
    return(
        <div className="page-section">
            <div className="page-section__top">
                <div>
                    <h2 className="page-section__title">Autorizaciones</h2>
                    <p className="page-section__subtitle">Listado de autorizaciones pendientes</p>
                </div>
            </div>
            <DataTable
                title="Autorizaciones"
                columns={columns}
                data={data}
                loading={loading}
                error={error}
                refetch={refetch}
            />
        </div>

    );
};

export default AutorizacionContent;