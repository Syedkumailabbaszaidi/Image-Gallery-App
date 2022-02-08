import { combineReducers, Reducer } from '@reduxjs/toolkit';
import AuthReducer from 'app/modules/auth/ducks/slice';
import ImageReducer from 'app/modules/image/ducks/slice';
import MessageSnackbarReducer from 'app/molecules/SnackMessage/ducks/slice';

const reducers = {
  message: MessageSnackbarReducer,
  auth: AuthReducer,
  image: ImageReducer,
};

const rootReducer: Reducer = combineReducers(reducers);

export default rootReducer;
