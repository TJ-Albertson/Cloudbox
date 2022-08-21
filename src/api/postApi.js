import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000`;

export const postApi = (data, route, token) => {

    return fetch(`${API_URL}${route}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: data
    })

    return axios.post(`${API_URL}${route}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,  
        },
    })
       
}