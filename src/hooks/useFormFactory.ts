import { useState, useCallback } from 'react';
import axios from 'axios';
import {useImmer} from "use-immer";

interface Config {
    url: string | (() => string);
    request?: () => Promise<any>;
    [key: string]: any; // Allow any additional properties
}

interface FetchConfig {
    url?: string;
    params?: object;
    silent?: boolean;
    [key: string]: any; // Allow additional properties
}

const getValue = <T>(x: T | (() => T)): T => (typeof x === 'function' ? (x as () => T)() : x);

export function useFormFactory<T>(config: Config) {
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [factory, setFactory] = useImmer<T | null>(null);

    const initialize = useCallback(async (_config?: FetchConfig) => {
        if (isInitialized) return;
        return fetchFactory(_config).then(() => setIsInitialized(true));
    }, [isInitialized]);

    const fetchFactory = useCallback(async (_config: FetchConfig = {}) => {
        setIsLoading(true);

        return (config.request ? config.request() : axios.get(getValue(_config.url) ?? getValue(config.url), { params: _config.params }))
            .then((response) => {
                if (_config.silent) {
                    return response;
                }
                setFactory(response.data);
            })
            .catch((error) => {
                throw error;
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [config]);

    const clear = useCallback(() => {
        setIsLoading(false);
        setIsInitialized(false);
        setFactory(null);
    }, []);

    return {
        isLoading,
        isInitialized,
        setIsInitialized,
        factory,
        setFactory,
        initialize,
        fetchFactory,
        clear,
    };
}
