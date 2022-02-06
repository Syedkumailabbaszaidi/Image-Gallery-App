import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOKEN_KEY } from 'configs/env';
import { AppDispatch } from 'store';
import { saveToLocal, getFromLocal, removeFromLocal } from 'utils/cache';
import { ILoginFormRequest, AuthState, ILoginFormResponse } from './types';
import * as AuthService from './services';
import { ApiResponse } from 'shared/interfaces';
import { func } from 'shared/types';
import { showMessage } from '../../../molecules/SnackMessage/ducks/slice';

const saveToken = (token: string) => {
  saveToLocal(TOKEN_KEY, token, false);
};

const removeToken = () => {
  removeFromLocal(TOKEN_KEY);
};

const getToken = () => {
  return getFromLocal(TOKEN_KEY, false) || null;
};

const saveUser = (user: any) => {
  saveToLocal('user', user);
};

const removeUser = () => {
  removeFromLocal('user');
};

const getUser = () => {
  return getFromLocal('user') || null;
};

export const initialState: AuthState = {
  token: getToken(),
  user: getUser(),
  loading: false,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginPending(state) {
      return { ...state, loading: true };
    },
    loginSuccess(state, action: PayloadAction<ILoginFormResponse>) {
      return {
        ...state,
        loading: false,
        errors: [],
        token: action.payload.token,
        user: action.payload.user,
      };
    },
    loginError(state) {
      state.loading = false;
    },

    registerPending(state) {
      return { ...state, loading: true };
    },
    registerSuccess(state, action: PayloadAction<ILoginFormResponse>) {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
      };
    },
    registerError(state) {
      state.loading = false;
    },

    logoutPending(state) {
      return { ...state, loading: true };
    },
    logoutSuccess(state) {
      const tempState = state;
      tempState.loading = false;
      tempState.token = null;
      tempState.user = null;
    },
    logoutError(state) {
      state.loading = false;
    },
  },
});

export const { actions: AuthActions, reducer: AuthReducer, name: sliceKey } = AuthSlice;

export const login =
  (credentials: ILoginFormRequest, onSuccess?: func, onFailure?: func) =>
  async (dispatch: AppDispatch) => {
    dispatch(AuthActions.loginPending());
    try {
      const response: ApiResponse = await AuthService.login(credentials);
      const { token, user }: ILoginFormResponse = response.data;
      saveToken(token);
      saveUser(user);
      dispatch(AuthActions.loginSuccess({ token, user }));
      if (onSuccess) {
        onSuccess(user);
      }
    } catch (error: any) {
      if (error && error.response) {
        const errorObj: ApiResponse = error.response.data;
        dispatch(AuthActions.loginError());
        dispatch(showMessage({ message: errorObj.message, variant: 'error' }));
        if (errorObj.error && onFailure) {
          onFailure(errorObj.error.errors);
        }
      } else {
        dispatch(showMessage({ message: error.message, variant: 'error' }));
      }
    }
  };

export const register =
  (credentials: ILoginFormRequest, onSuccess?: func, onFailure?: func) =>
  async (dispatch: AppDispatch) => {
    dispatch(AuthActions.registerPending());
    try {
      const response: ApiResponse = await AuthService.register(credentials);
      const { token, user }: ILoginFormResponse = response.data;
      saveToken(token);
      saveUser(user);
      dispatch(AuthActions.registerSuccess({ token, user }));
      if (onSuccess) {
        onSuccess(user);
      }
    } catch (error: any) {
      if (error && error.response) {
        const errorObj: ApiResponse = error.response.data;
        dispatch(AuthActions.registerError());
        dispatch(showMessage({ message: errorObj.message, variant: 'error' }));
        if (errorObj.error && onFailure) {
          onFailure(errorObj.error.errors);
        }
      } else {
        dispatch(showMessage({ message: error.message, variant: 'error' }));
      }
    }
  };

export const logout = (onSuccess?: func, onFailure?: func) => async (dispatch: AppDispatch) => {
  dispatch(AuthActions.loginPending());
  try {
    await AuthService.logout();
    removeToken();
    removeUser();
    dispatch(AuthActions.logoutSuccess());
    if (onSuccess) {
      onSuccess();
    }
  } catch (error: any) {
    if (error && error.response) {
      const errorObj: ApiResponse = error.response.data;
      dispatch(AuthActions.registerError());
      dispatch(showMessage({ message: errorObj.message, variant: 'error' }));
      if (errorObj.error && onFailure) {
        onFailure(errorObj.error.errors);
      }
    } else {
      dispatch(showMessage({ message: error.message, variant: 'error' }));
    }
  }
};

export default AuthReducer;
