import { useCallback } from "react";
import DataTable from "../atoms/DataTable";
import useFetch from "../../hooks/useFetch";
import { getUsuarios } from "../../services/api";
import "../styles/pageSection.css";

const columns = [
  { key: "idUsuario",      label: "#" },
  { key: "nombreUsuario",  label: "Usuario" },
  {
    key: "rol",
    label: "Rol",
    render: (val) => {
      const map = { admin: "blue", usuario: "gray", conductor: "amber" };
      return (
        <span className={`badge badge--${map[val] ?? "gray"}`}>
          {val ?? "—"}
        </span>
      );
    },
  },
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

const UsuariosContent = () => {
  const fetcher = useCallback(getUsuarios, []);
  const { data, loading, error, refetch } = useFetch(fetcher);

  return (
    <div className="page-section">
      <div className="page-section__top">
        <div>
          <h2 className="page-section__title">Usuarios</h2>
          <p className="page-section__subtitle">Listado de usuarios registrados</p>
        </div>
      </div>
      <DataTable
        title="Usuarios"
        columns={columns}
        data={data}
        loading={loading}
        error={error}
        onRefetch={refetch}
      />
    </div>
  );
};

export default UsuariosContent;