const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000`

export const getFileList = (email) => {
    return fetch(`${API_URL}/getFiles/${email}`)
      .then(res => res.json())
}