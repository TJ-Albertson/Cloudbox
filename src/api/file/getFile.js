const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000`

export const getFile = (email, id) => {
    return fetch(`${API_URL}/download/${email}/${id}/`,
        { responseType: "blob" })
      .then(res => res.json())
}