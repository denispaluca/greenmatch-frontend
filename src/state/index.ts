/* eslint-disable indent */
import { createStore } from 'react-hooks-global-state';

type State = {
  loginType?: 'Buyer' | 'Supplier';
  token: string;
  username?: string;
}

type Action =
  // eslint-disable-next-line max-len
  { type: 'setLogin'; loginType: 'Buyer' | 'Supplier'; username: string; token: string }
  | { type: 'logout' };

const defaultState: State = {
  loginType: undefined,
  username: '',
  token: '',
};

const LOCAL_STORAGE_KEY = 'my_local_storage_key';

const stateFromStorage = (localStorage.getItem(LOCAL_STORAGE_KEY));
const initialState: State = stateFromStorage === null ?
  defaultState : JSON.parse(stateFromStorage);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setLogin': {
      const newState = {
        ...state, LoginType: action.loginType, username: action.username,
        token: action.token,
      };
      console.log(newState);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    }
    case 'logout': {
      const newState = { ...state, LoginType: undefined, token: '' };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    }
    default: return state;
  }
};

export const { dispatch, useStoreState } = createStore(
  reducer,
  initialState,
);
