import { useAuth0 } from "@auth0/auth0-react";
const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000`;

export const postApi = (data, route, contentType) => {

    const { getAccessTokenSilently } = useAuth0();

    (async () => {
        const accessToken = await getAccessTokenSilently({ audience: `${API_URL}`});
        return fetch(`${API_URL}${route}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${accessToken}`,
            },
            body: new URLSearchParams({
                'shareEmail': form[0].value
            })
        })
    })
}