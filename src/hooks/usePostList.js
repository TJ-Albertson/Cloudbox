import { useAuth0 } from '@auth0/auth0-react';

export async function usePostList(route, emails, header) {

  const { getAccessTokenSilently } = useAuth0();
  const token = await getAccessTokenSilently({ audience: 'http://localhost:5000' });

  fetch("/removeShareEmail" ,{
    data: emails,
    headers: {
        ...header,
        Authorization: `Bearer ${token}`
    }
})
.then(res => res.json())
}