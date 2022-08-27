export class HttpState {
    static Idle = "Idle";
    static Request = "Request";
    static Success = "Success";
    static Error = "Error";
}

export const useHttp = () => {
    //const [httpState, setHttpState] = useState(HttpState.Idle);
    //const [error, setError] = useState(false);

    const request = async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        //setHttpState(HttpState.Request);
        //setError(false);

        try {
            const response = await fetch(url, { method, body: body ? JSON.stringify(body) : body, headers });

            if (!response.ok) {
                throw new Error(`Could not request ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            //setHttpState(HttpState.Success);
            return data;
        } catch (error) {
            //setError(error);
            //setHttpState(HttpState.Error);

            throw error;
        }
    };

    return request;
}