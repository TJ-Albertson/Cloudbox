const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000`

export const getEmailGroups = () => {
    return fetch(`${API_URL}/groups`,
    { headers: { "x-access-token": localStorage.getItem("token") }, })
      .then(res => res.json())
      .then(data => data[0])
}
