const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000`;

export const fetchApi = (route, options) => {

    return fetch(`${API_URL}${route}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${options.token}`,
        },
    }).then(res => res.json())
}