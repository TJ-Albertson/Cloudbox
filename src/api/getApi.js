const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000`;

export const getApi = (route, token) => {

    return fetch(`${API_URL}${route}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(res => res.json())
}