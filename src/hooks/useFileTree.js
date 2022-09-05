import { useEffect, useState } from "react";

async function setFileList() {
  postApi("/setFileList", JSON.stringify(object), signedInUser.token, {
    "Content-Type": "application/json",
  }).then(console.log(data));
}

export const useFileTree = (url, options = {}) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [state, setState] = useState({
    token: null,
    loading: true,
    data: options.dummyData
  });
  
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
        const audience = 'http://localhost:5000'
        const { scope, boxEmail, ...fetchOptions } = options;
        const accessToken = await getAccessTokenSilently({ audience });
        const res = await fetch(url, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setState({
          ...state,
          data: await res.json(),
          token: accessToken,
          loading: false,
        });
    })();
  }, [refreshIndex]);

  return {
    ...state,
    refresh: () => setRefreshIndex(refreshIndex + 1),
  };
};
