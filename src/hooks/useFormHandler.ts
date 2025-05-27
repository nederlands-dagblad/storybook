import { useState, useCallback, useMemo } from 'react';
import axios from 'axios';

interface Config {
    url: string | (() => string);
    request?: (data: any) => Promise<any>;
    onSuccess?: (response: any) => void;
    onValidationError?: (errors: any) => void;
    onError?: (error: any) => void;
}

const getValue = (x: any) => (typeof x === 'function' ? x() : x);

export function useFormHandler(config: Config) {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, any>>({});

    const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

    const submit = useCallback(
        async (data: any, _config: { url?: string } = {}) => {
            setIsLoading(true);
            setErrors({});

            const request = config.request
                ? config.request(data)
                : axios.post(getValue(_config.url) ?? getValue(config.url), data);

            return request
                .then((response) => {
                    config.onSuccess?.(response);
                    return response;
                })
                .catch((error: any) => {
                    config.onError?.(error);
                    if (error.response?.status === 422) {
                        setErrors(error.response.data.errors);
                        config.onValidationError?.(error.response.data.errors);
                    }
                    throw error;
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [config]
    );

    const clear = useCallback(() => {
        setIsLoading(false);
        setErrors({});
    }, []);

    return {
        isLoading,
        errors,
        setErrors,
        hasErrors,
        submit,
        clear,
    };
}
