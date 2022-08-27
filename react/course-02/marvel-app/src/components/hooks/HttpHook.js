import { useCallback, useState } from "react"

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(
        async (url, method = "GET", body = null, headers = { "Content-Type": "application/json" }) => {
            setIsLoading(true);
            setError(false);

            try {
                const response = await fetch(url, {method, body, headers});

                if (!response.ok) {
                    throw new Error(`Couldn't fetch resource [${url}]. Status [${response.status}]`)
                }

                const data = await response.json();
                setIsLoading(false);
                return data;
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        }, []);

    return {isLoading, request, error};
}