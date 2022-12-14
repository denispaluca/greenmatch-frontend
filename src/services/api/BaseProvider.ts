import { dispatch } from '../../state';
import { logout } from '../auth/auth';
import history from '../../customRoutes/history';


// TODO Delete cookie getting after moving to server cookies
export const request = async (
  resource: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: any,
) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/${resource}`, {
    method,
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    await logout();
    dispatch({ type: 'logout' });
    history.push('/login');
  }

  return response.json();
};


export const list = <T>(resource: string, query?: Record<string, string>):
  Promise<T[]> => {
  const queryString = query ? new URLSearchParams(query).toString() : '';
  return request(`${resource}?${queryString}`, 'GET');
};

export const create = <T>(resource: string, body: object): Promise<T> => {
  return request(resource, 'POST', body);
};

export const get = <T>(resource: string, id: string): Promise<T> => {
  return request(`${resource}/${id}`, 'GET');
};

export const update = <T>(resource: string, id: string, body: object):
  Promise<T> => {
  return request(`${resource}/${id}`, 'PATCH', body);
};

export const remove = <T>(resource: string, id: string): Promise<T> => {
  return request(`${resource}/${id}`, 'DELETE');
};
