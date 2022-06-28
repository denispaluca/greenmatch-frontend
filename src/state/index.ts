/* eslint-disable indent */
import { createStore } from 'react-hooks-global-state';

type State = {
  loginType?: 'Buyer' | 'Supplier';
  loggedIn: boolean;
}

type Action = { type: 'setLoginType'; loginType: 'Buyer' | 'Supplier' }
  | { type: 'logout' };

const defaultState: State = {
  loginType: undefined,
  loggedIn: false,
};

const LOCAL_STORAGE_KEY = 'my_local_storage_key';

const stateFromStorage = (localStorage.getItem(LOCAL_STORAGE_KEY));
const initialState: State = stateFromStorage === null ?
  defaultState : JSON.parse(stateFromStorage);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setLoginType': {
      const newState = {
        ...state, LoginType: action.loginType,
        loggedIn: true,
      };
      console.log(newState);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    }
    case 'logout': {
      const newState = { ...state, LoginType: undefined, loggedIn: false };
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
