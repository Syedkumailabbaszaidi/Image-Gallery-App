import { createSlice } from '@reduxjs/toolkit';
import { MessageSnackbarState } from './types';

export const initialState: MessageSnackbarState = {
  state: false,
  options: {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    autoHideDuration: 6000,
    message: '',
    variant: '',
  },
};

const MessageSnackbarSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage: (state, { payload }) => {
      const tempState = state;
      tempState.state = true;
      tempState.options = {
        ...initialState.options,
        ...payload,
      };
    },
    hideMessage: (state) => {
      const tempState = state;
      tempState.state = false;
    },
  },
});

export const {
  actions: MessageSnackbarActions,
  reducer: MessageSnackbarReducer,
  name: sliceKey,
} = MessageSnackbarSlice;

export const { showMessage, hideMessage } = MessageSnackbarSlice.actions;

export default MessageSnackbarReducer;
