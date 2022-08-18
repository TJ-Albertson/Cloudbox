import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000`

export const useApi = (url) => {

  const { getAccessTokenSilently } = useAuth0();

  const [refreshIndex, setRefreshIndex] = useState(0)

  const [emailGroups, setEmailGroups] = useState({
    boxArray: [],
    emailArray: [],
    shareArray: [],
  });

  useEffect(() => {
    (async () => {
        const token = await getAccessTokenSilently({ audience: "http://localhost:5000",});
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => res.json())
        .then(setEmailGroups)
    })();
  }, [refreshIndex]);

  return {
    emailGroups,
    setEmailGroups,
    refresh: () => setRefreshIndex(refreshIndex + 1)
  }
};
