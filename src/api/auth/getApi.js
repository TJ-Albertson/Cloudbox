import { useAuth0 } from "@auth0/auth0-react";
const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000/`;


export const getApi = (route, token) => {
  return fetch(`${API_URL}${route}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
}

