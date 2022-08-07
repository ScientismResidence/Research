import { useCallback, useState } from "react";

export class HttpState {
    static Idle = "Idle";
    static Request = "Request";
    static Success = "Success";
    static Error = "Error";
}

export const useHttp = (url, onSuccess, onError) => {
    const [httpState, setHttpState] = useState(HttpState.Idle);
    const [error, setError] = useState(false);

    const request = useCallback(async (method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        setHttpState(HttpState.Request);
        setError(false);

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(`Could not request ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            await onSuccess(data);
            setHttpState(HttpState.Success);
        } catch (error) {
            setError(error);
            await onError(error);
            setHttpState(HttpState.Error);

            throw error;
        }
    }, []);

    return { request, httpState, error }
}