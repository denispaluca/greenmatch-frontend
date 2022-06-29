/* eslint-disable indent */
import { createStore } from 'react-hooks-global-state';
import Cookies from 'universal-cookie';

type State = {
  loginType?: 'Buyer' | 'Supplier';
  token: string;
}

type Action =
  { type: 'setLogin'; loginType: 'Buyer' | 'Supplier'; token: string }
  | { type: 'logout' };

const defaultState: State = {
  loginType: undefined,
  token: '',
};

const cookieKey = 'cookie_key';

const cookies = new Cookies();

const stateFromCookies = cookies.get(cookieKey);

const initialState: State = stateFromCookies === undefined ?
  defaultState : stateFromCookies;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setLogin': {
      const newState = {
        ...state, LoginType: action.loginType,
        token: action.token,
      };
      console.log(newState);
      cookies.set(cookieKey,
        JSON.stringify(newState), { secure: true, sameSite: 'strict' });
      return newState;
    }
    case 'logout': {
      const newState = { ...state, LoginType: undefined, token: '' };
      cookies.set(cookieKey,
        JSON.stringify(newState), { secure: true, sameSite: 'strict' });
      return newState;
    }
    default: return state;
  }
};


// TODO: Delete after moving to server cookies
export const getCookie = () => cookies.get(cookieKey);

export const { dispatch, useStoreState } = createStore(
  reducer,
  initialState,
);
