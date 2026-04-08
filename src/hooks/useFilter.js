import { useState, useMemo } from "react";

/**
 * useFilter
 * @param {Array}  data         - array completo de registros
 * @param {Array}  searchKeys   - campos donde buscar texto (ej: ["nombre","apellido"])
 * @param {string} filterKey    - campo exacto para el select (ej: "rol")
 */
const useFilter = (data, searchKeys = [], filterKey = "") => {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("");

  const filtered = useMemo(() => {
    return data.filter(item => {
      // Búsqueda por texto en múltiples campos
      const matchSearch = search.trim() === ""
        ? true
        : searchKeys.some(key => {
            const val = item[key];
            return val != null &&
              String(val).toLowerCase().includes(search.trim().toLowerCase());
          });

      // Filtro exacto por select
      const matchFilter = filter === ""
        ? true
        : String(item[filterKey]).toLowerCase() === filter.toLowerCase();

      return matchSearch && matchFilter;
    });
  }, [data, search, filter, searchKeys, filterKey]);

  const clear = () => { setSearch(""); setFilter(""); };

  return { search, setSearch, filter, setFilter, filtered, clear };
};

export default useFilter;