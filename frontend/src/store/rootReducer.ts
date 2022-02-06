import { combineReducers, Reducer } from '@reduxjs/toolkit';
import AuthReducer from 'app/modules/auth/ducks/slice';
import MessageSnackbarReducer from 'app/molecules/SnackMessage/ducks/slice';

const reducers = {
  message: MessageSnackbarReducer,
  auth: AuthReducer,
};

const rootReducer: Reducer = combineReducers(reducers);

export default rootReducer;
