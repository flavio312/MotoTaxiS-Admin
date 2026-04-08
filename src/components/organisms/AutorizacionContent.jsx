import { useCallback } from "react";
import DataTable from "../atoms/DataTable";
import useFetch from "../../hooks/useFetch";
import { getAutorizacionPropietarios, 
  aprobarAutorizacionPropietarios, 
  rechazarAutorizacionPropietarios 
} from "../../services/api";
import useFilter from "../../hooks/useFilter";
import SearchBar from "../atoms/SearchBar";
import "../styles/pageSection.css";

 const ESTADOS = [
  { value: "pendiente",  label: "Pendiente" },
  { value: "aceptado",   label: "Aceptado" },
  { value: "rechazado",  label: "Rechazado" },
];
 
const estadoBadge = {
  pendiente: "amber",
  aceptado:  "green",
  rechazado: "red",
};
const columns = [
  { key: "idAutorizacion", label: "#" },
  { key: "nombre", label: "Inscripción" },
  { key: "rfc", label: "RFC"},
  { key: "fechaSolicitud", label: "Fecha de Solicitud",
    render: (val)=>{
      const fechaSolicitud = new Date(val);
      return fechaSolicitud.toLocaleDateString("es-MX")
    }
  },
  {
    key: "estado",
    label: "Estado",
    render: (val) => {
      const pendiente = val === "pendiente" || val === true || val === 1 || val === "1";
      const aprobado = val === "aprobado" || val === "aceptado" || val === false || val === 0 || val === "0";
      return (
        <span className={`badge badge--${pendiente ? "yellow" : aprobado ? "green" : "red"}`}>
          {pendiente ? "Pendiente" : aprobado ? "Aprobado" : "Rechazado" }
        </span>
      );
    }
  },
  {
    key:"acciones", label: "Acciones",
    render: (_, row) => (
      <div className="actions">
        <button className="btn btn--small btn--blue" 
        onClick={() => handleAprobar(row.idAutorizacion)}>
            Aceptar
        </button>

        <button className="btn btn--small btn--red"
        onClick={() => handleRechazar(row.idAutorizacion)}>
            Rechazar
        </button>
      </div>
    )
  },
];

const AutorizacionContent = () => {
  const fetcher = useCallback(getAutorizacionPropietarios, []);
  const { data, loading, error, refetch } = useFetch(fetcher);

  const { search, setSearch, filter, setFilter, filtered, clear } = 
  useFilter(data, ["nombre","rfc"], "estado");

  const handleAprobar = async (id) => {
    try {
      await aprobarAutorizacionPropietarios(id, { estado: "aprobado" });
      refetch();
    } catch (error) {
      console.error("Error al aprobar:", error);
    }
  };

  const handleRechazar = async (id) => {
    try {
      await rechazarAutorizacionPropietarios(id);
      refetch();
    } catch (error) {
      console.error("Error al rechazar:", error);
    }
  };
  return(
    <div className="page-section">
      <div className="page-section__top">
        <div>
          <h2 className="page-section__title">Autorizaciones</h2>
            <p className="page-section__subtitle">Listado de autorizaciones pendientes</p>
        </div>
      </div>

      <SearchBar
      searchValue={search}
      onSearchChange={setSearch}
      filterValue={filter}
      onFilterChange={setFilter}
      searchPlaceholder="Buscar por nombre o correo..."
      filterLabel="Todos los estados"
      filterOptions={ESTADOS}
      onClear={clear}
      />
      <DataTable
      title="Autorizaciones"
      columns={columns}
      data={filtered}
      loading={loading}
      error={error}
      refetch={refetch}
      />
    </div>
  );
};

export default AutorizacionContent;