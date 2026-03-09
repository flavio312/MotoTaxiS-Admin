import { useState, useEffect, useCallback } from "react";

const useFetch = (fetchFn) => {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      // Accept array directly or { data: [...] }
      setData(Array.isArray(result) ? result : result.data ?? result);
    } catch (err) {
      setError(err.message || "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, refetch: load };
};

export default useFetch;