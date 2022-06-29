import { dispatch, getCookie } from '../../state';

// TODO Delete cookie getting after moving to server cookies
export const request = async (
  resource: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: any,
) => {
  const cookie = getCookie();
  if (!cookie) {
    dispatch({ type: 'logout' });
  }

  const response = await fetch(`${process.env.REACT_APP_API_URL}/${resource}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': cookie.token,
    },
  });

  if (response.status === 401) {
    dispatch({ type: 'logout' });
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
