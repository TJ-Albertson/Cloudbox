import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000`

export const useApi = (url) => {

  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    loading: true,
    data: null,
  })

  const [refreshIndex, setRefreshIndex] = useState(0)

  useEffect(() => {
    (async () => {
        const token = await getAccessTokenSilently({ audience: "http://localhost:5000",});
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setState({
            data: await res.json(),
            loading: false
        })
    })();
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1)
  }
};
