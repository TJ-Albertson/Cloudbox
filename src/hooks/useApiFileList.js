import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000`

export const useApiFileList = () => {

  const { getAccessTokenSilently } = useAuth0();
  const [refreshIndex, setRefreshIndex] = useState(0)
  
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    (async () => {
        const token = await getAccessTokenSilently({ audience: "http://localhost:5000",});
        const res = await fetch("http://localhost:5000/getFileList", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => res.json())
        .then(setFileList)
    })();
  }, [refreshIndex]);

  return {
    fileList,
    setFileList,
    refreshFileList: () => setRefreshIndex(refreshIndex + 1)
  }
};
