export const asyncFetch = async (url: string, method?: string , body?: object) => {
    try {
        if(!method) {
            method = 'GET';
        }
        if(method && !['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase())) {
            throw new Error(`Invalid HTTP method: ${method}`);
        }
        if(body && method?.toUpperCase() === 'GET') {
            throw new Error('GET requests should not have a body');
        }
        
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            ...(body && { body: JSON.stringify(body) })
        };
        const responseFetched = await fetch(url, options)
        if (!responseFetched.ok) {
            throw new Error(`HTTP error! status: ${responseFetched.status}`);
        }
        const response = await responseFetched.json();
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}