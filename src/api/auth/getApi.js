import { useAuth0 } from "@auth0/auth0-react";
const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000/`;

export const getApi = (route, token, header, data) => {
    return fetch(`${API_URL}${route}`, {
      data: data,
      headers: { Authorization: `Bearer ${token}`, ...header },
      })
    .then((res) => res.json())
}

