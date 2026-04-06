import useNotificationManager from "../components/Notification/hooks/useNotificationManager";

export const asyncFetch = async (url: string, method?: string , body?: object) => {
    const {notify}= useNotificationManager();
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
            notify(`Failed to get the requested data at 
                ${url}: Error ${responseFetched.status}.`, 'error')
            throw new Error(`HTTP error! status: ${responseFetched.status}`);
        }
        const response = await responseFetched.json();
        return response;
    } catch (error) {
        notify(`Error getting the data: ${error}.`, 'error')
        throw error;
    }
}