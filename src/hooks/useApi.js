import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const API_URL = process.env.REACT_APP_API_URL || `http://localhost:5000`;

export const useApi = (route, options = {}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    token: null,
    loading: true,
    data: options.dummyData
  });
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    (async () => {
        const audience = API_URL
        const { scope, ...fetchOptions } = options;
        const accessToken = await getAccessTokenSilently({ audience, scope });
        const res = await fetch(API_URL + route, {
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