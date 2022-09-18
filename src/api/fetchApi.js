import config from "../config.json"

const API_URL = config.API || `http://localhost:5000`;

//switch to axios
export const fetchApi = (route, options) => {

    return fetch(`${API_URL}${route}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${options.token}`,
        },
    }).then(res => res.json())
}