
import DataTable from "../atoms/DataTable";
import "../styles/pageSection.css";

const columns = [
    { key: "idServicio", label: "#" },
    { key: "pasajero", label: "Pasajero" },
    { key: "conductor", label: "Conductor" },
    {
        key: "estado",
        label: "Estado",
      render: (val) => {            
    const curso = val === "curso" || val === true || val === 1;
    return (
        <span className={`badge ${curso ? "bg-success" : "bg-danger"}`}>
            {curso ? "En curso" : "Terminado"}
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

const ServiciosContent = () => {
    return(
        <div className="page-section">
            <div className="page-section__top">
                <div>
                    <h2 className="page-section__title">Servicios</h2>
                    <p className="page-section__subtitle">Listado de servicios</p>
                </div>
            </div>
            <DataTable
                title="Servicios"
                columns={columns}
                data={data}
                loading={loading}
                error={error}
            />
        </div>

    );
};

export default ServiciosContent;