const API_URL = `http://localhost:5000`

export const getLogin = () => {
    return fetch(`${API_URL}/isLoggedIn`, 
    { headers: { "x-access-token": localStorage.getItem("token") }, })
      .then(res => res.json())
      .then(data => data.email)
}