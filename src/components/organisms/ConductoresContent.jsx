import { useCallback } from "react";
import DataTable from "../atoms/DataTable";
import useFetch from "../../hooks/useFetch";
import { getConductores } from "../../services/api";
import "../styles/pageSection.css";

const columns = [
  { key: "idConductor",   label: "#" },
  { key: "nombre",        label: "Nombre" },
  { key: "apellidoP",      label: "Apellido paterno" },
  { key: "licencia",      label: "Licencia" },
  {key:"licenciaFechaVencimiento", label: "Vencimiento licencia"},
  {
    key: "estado",
    label: "Estado",
    render: (val) => {
      const activo = val === "activo" || val === true || val === 1;
      return (
        <span className={`badge badge--${activo ? "green" : "red"}`}>
          {activo ? "Activo" : "Inactivo"}
        </span>
      );
    },
  },{
      key:"acciones", label: "Acciones", render: () => (
    <div className="actions">
      <button className="btn btn--small btn--blue">Editar</button>
      <button className="btn btn--small btn--red">Eliminar</button>
    </div>
  ),
  }
];

const ConductoresContent = () => {
  const fetcher = useCallback(getConductores, []);
  const { data, loading, error, refetch } = useFetch(fetcher);

  return (
    <div className="page-section">
      <div className="page-section__top">
        <div>
          <h2 className="page-section__title">Conductores</h2>
          <p className="page-section__subtitle">Listado de conductores registrados</p>
        </div>
      </div>
      <DataTable
        title="Conductores"
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        onRefetch={refetch}
      />
    </div>
  );
};

export default ConductoresContent;