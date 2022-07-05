/* eslint-disable indent */
import { createStore } from 'react-hooks-global-state';

type State = {
  loginType?: 'Buyer' | 'Supplier';
  username: string;
}

type Action =
  { type: 'setLogin'; loginType: 'Buyer' | 'Supplier', username: string }
  | { type: 'logout' };

const defaultState: State = {
  loginType: undefined,
  username: '',
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
      };
      console.log(newState);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    }
    case 'logout': {
      const newState = { ...state, LoginType: undefined, username: '' };
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
