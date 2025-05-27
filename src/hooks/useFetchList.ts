import { useState, useCallback, useMemo } from 'react';
import axios from 'axios';

interface Meta {
    current_page?: number;
    from?: number;
    last_page?: number;
    availableSlots?: number;
    usedSlots?: number;
}

interface Config {
    url: string | (() => string);
    params?: object | (() => object);
    onFetched?: (response: any) => void;
}

const getValue = <T>(x: T | (() => T)): T => (typeof x === 'function' ? (x as () => T)() : x);

export function useFetchList<T>(config: Config) {
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [data, setData] = useState<T[] | null>(null);
    const [meta, setMeta] = useState<Meta | null>(null);

    const isEmpty = useMemo(() => isInitialized && !isLoading && (data?.length === 0), [isInitialized, isLoading, data]);

    const fetch = useCallback(async (resetPagination = false) => {
        setIsLoading(true);

        const params = {
            ...getValue(config.params) ?? {},
            ...(meta?.current_page ? { page: meta.current_page } : {}),
        };

        return axios
            .get(getValue(config.url), { params })
            .then((response) => {
                setData(response.data.users ?? response.data.data);
                if (response.data.meta) {
                    setMeta(response.data.meta);
                }
                config.onFetched?.(response);
            })
            .catch((error) => {
                console.error(error);
                throw error;
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [config, meta?.current_page]);

    const initialize = useCallback(async () => {
        if (isInitialized) return;
        return fetch().then(() => setIsInitialized(true));
    }, [isInitialized, fetch]);

    const clear = useCallback(() => {
        setIsLoading(false);
        setIsInitialized(false);
        setData(null);
        setMeta(null);
    }, []);

    return {
        isLoading,
        isInitialized,
        data,
        meta,
        isEmpty,
        initialize,
        fetch,
        clear,
    };
}
