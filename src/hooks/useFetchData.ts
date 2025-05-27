import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Config {
  url: string | (() => string);
  params?: object | (() => object);
  onFetched?: (response: any) => void;
  initialFetch?: boolean;
  dataKey?: string; // Key to extract from the response, defaults to 'data'
}

const getValue = <T>(x: T | (() => T)): T => (typeof x === 'function' ? (x as () => T)() : x);

export function useFetchData<T>(config: Config) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const params = getValue(config.params) ?? {};
    const dataKey = config.dataKey || 'data'; // Default to 'data'

    try {
      const response = await axios.get(getValue(config.url), { params });

      // Extract the desired key from the response
      const extractedData = response.data[dataKey];
      setData(extractedData);

      if (config.onFetched) {
        config.onFetched(response);
      }

      return extractedData;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [config]);

  const initialize = useCallback(async () => {
    if (isInitialized) return;
    return fetch().then(() => setIsInitialized(true));
  }, [isInitialized, fetch]);

  const clear = useCallback(() => {
    setIsLoading(false);
    setIsInitialized(false);
    setData(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (config.initialFetch) {
      initialize();
    }
  }, [initialize, config.initialFetch]);

  return {
    isLoading,
    isInitialized,
    data,
    error,
    isEmpty: isInitialized && !isLoading && !data,
    initialize,
    fetch,
    clear,
  };
}