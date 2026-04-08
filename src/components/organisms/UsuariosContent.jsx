import { useCallback } from "react";
import DataTable from "../atoms/DataTable";
import SearchBar from "../atoms/SearchBar";
import useFilter from "../../hooks/useFilter";
import useFetch from "../../hooks/useFetch";
import { getUsuarios } from "../../services/api";
import "../styles/pageSection.css";

const ROLES = [
  { value: "pasajero", label: "Pasajero" },
  { value: "conductor", label: "Conductor" },
  { value: "propietario", label: "Propietario" },
];

const columns = [
  { key: "idUsuario",      label: "#" },
  { key: "nombreUsuario",  label: "Usuario" },
  { key: "nombre",         label: "Nombre" },
  { key: "correoElectronico",          label: "Email" },
  {
    key: "rol",
    label: "Rol",
    render: (val) => {
      const map = { admin: "blue", pasajero: "gray", conductor: "amber" };
      return (
        <span className={`badge badge--${map[val] ?? "gray"}`}>
          {val ?? "—"}
        </span>
      );
    },
  },
  {
    key: "estadoCuenta",
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

  const { search, setSearch, filter, setFilter, filtered, clear } = 
  useFilter(data, ["nombre","nombreUsuario","correoElectronico"], "rol");

  return (
    <div className="page-section">
      <div className="page-section__top">
        <div>
          <h2 className="page-section__title">Usuarios</h2>
          <p className="page-section__subtitle">Listado de usuarios registrados</p>
        </div>
      </div>

      <SearchBar
        searchValue={search}
        onSearchChange={setSearch}
        filterValue={filter}
        onFilterChange={setFilter}
        searchPlaceholder="Buscar por nombre o usuario..."
        filterLabel="Todos los roles"
        filterOptions={ROLES}
        onClear={clear}
      />
      
      <DataTable
        title="Usuarios"
        columns={columns}
        data={filtered}
        loading={loading}
        error={error}
        onRefetch={refetch}
      />
    </div>
  );
};

export default UsuariosContent;