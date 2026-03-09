import "./DataTable.css";
import Button from "./Button";

const DataTable = ({ title, columns, data, loading, error, onRefetch }) => {
  const renderBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={columns.length}>
            <div className="data-table-state">
              <span className="data-table-state__icon">⏳</span>
              <span className="data-table-state__text">Cargando datos...</span>
            </div>
          </td>
        </tr>
      );
    }
    if (error) {
      return (
        <tr>
          <td colSpan={columns.length}>
            <div className="data-table-state">
              <span className="data-table-state__icon">⚠️</span>
              <span className="data-table-state__error">{error}</span>
              {onRefetch && (
                <Button variant="secondary" onClick={onRefetch}>Reintentar</Button>
              )}
            </div>
          </td>
        </tr>
      );
    }
    if (!data.length) {
      return (
        <tr>
          <td colSpan={columns.length}>
            <div className="data-table-state">
              <span className="data-table-state__icon">📭</span>
              <span className="data-table-state__text">Sin registros</span>
            </div>
          </td>
        </tr>
      );
    }
    return data.map((row, i) => (
      <tr key={i}>
        {columns.map(col => (
          <td key={col.key}>
            {col.render ? col.render(row[col.key], row) : (row[col.key] ?? "—")}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <div className="data-table-wrapper">
      <div className="data-table-wrapper__header">
        <span className="data-table-wrapper__title">{title}</span>
        {!loading && !error && (
          <span className="data-table-wrapper__count">{data.length} registros</span>
        )}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;