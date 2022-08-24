const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000`;

export const postApi = (route, data, token, header) => {

    return fetch(`${API_URL}${route}`, {
        method: "POST",
        headers: {
            ...header,
            Authorization: `Bearer ${token}`,
        },
        body: data
    }).then(res => res.json())
}