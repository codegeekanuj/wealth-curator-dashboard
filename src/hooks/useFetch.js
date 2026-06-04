import { useState, useEffect, useCallback, useRef } from 'react';

export function useFetch(mockDataToReturn, options = {}) {
  const { delay = 500, simulateError = false, simulateEmpty = false } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Keep track of the initial render so we don't trigger state updates if component unmounts
  const isMounted = useRef(true);

  const fetchData = useCallback(() => {
    if (!isMounted.current) return;
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      if (!isMounted.current) return;
      if (simulateError) {
        setError("Failed to fetch data from the server. Please try again later.");
        setData(null);
      } else if (simulateEmpty) {
        setData(Array.isArray(mockDataToReturn) ? [] : {});
      } else {
        setData(mockDataToReturn);
      }
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [mockDataToReturn, delay, simulateError, simulateEmpty]);

  useEffect(() => {
    isMounted.current = true;
    const cleanup = fetchData();
    return () => {
      isMounted.current = false;
      if (cleanup) cleanup();
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
