import "./SearchBar.css";

/**
 * SearchBar reutilizable
 * @param {string}   searchValue     - valor del input de texto
 * @param {function} onSearchChange  - handler del input
 * @param {string}   filterValue     - valor del select
 * @param {function} onFilterChange  - handler del select
 * @param {string}   searchPlaceholder
 * @param {string}   filterLabel     - opción vacía del select (ej: "Todos los roles")
 * @param {Array}    filterOptions   - [{ value, label }]
 * @param {function} onClear         - callback para limpiar todo
 */
const SearchBar = ({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  searchPlaceholder = "Buscar...",
  filterLabel = "Todos",
  filterOptions = [],
  onClear,
}) => {
  const hasCriteria = searchValue || filterValue;

  return (
    <div className="search-bar">
      <div className="search-bar__input-wrapper">
        <span className="search-bar__icon">🔍</span>
        <input
          type="text"
          className="search-bar__input"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>

      {filterOptions.length > 0 && (
        <select
          className="search-bar__select"
          value={filterValue}
          onChange={e => onFilterChange(e.target.value)}
        >
          <option value="">{filterLabel}</option>
          {filterOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {hasCriteria && (
        <button className="search-bar__clear" onClick={onClear}>
          ✕ Limpiar
        </button>
      )}
    </div>
  );
};

export default SearchBar;