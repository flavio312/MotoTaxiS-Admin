import { useCallback } from "react";
import DataTable from "../atoms/DataTable";
import useFetch from "../../hooks/useFetch";
import { getPropietarios } from "../../services/api";
import "../styles/PageSection.css";

const columns = [
  { key: "idPropietario", label: "#" },
  { key: "nombre",        label: "Nombre" },
  { key: "apellidoP",      label: "Apellido paterno" },
  { key: "apellidoM",      label: "Apellido materno" },
  { key: "correoElectronico",        label: "Correo" },
  { key: "telefono",      label: "Teléfono" },
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
  },
];

const PropietariosContent = () => {
  const fetcher = useCallback(getPropietarios, []);
  const { data, loading, error, refetch } = useFetch(fetcher);

  return (
    <div className="page-section">
      <div className="page-section__top">
        <div>
          <h2 className="page-section__title">Propietarios</h2>
          <p className="page-section__subtitle">Listado de propietarios registrados</p>
        </div>
      </div>
      <DataTable
        title="Propietarios"
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        onRefetch={refetch}
      />
    </div>
  );
};

export default PropietariosContent;