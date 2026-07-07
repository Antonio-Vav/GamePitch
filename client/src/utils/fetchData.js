const BASE_URL = 'http://localhost:3000/api'; 

/**
 * Custom fetchData utility wrapper to handle HTTP requests
 * @param {string} endpoint - The API endpoint route
 * @param {string} method - HTTP method 
 * @param {object|null} body - Data payload to send 
 */
export async function fetchData(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || data.message || 'Something went wrong');
        }
        
        return data;
    } catch (err) {
        console.error(`API Error on ${endpoint}:`, err.message);
        throw err;
    }
}