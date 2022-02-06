import { ReactChild } from 'react';

export interface MessageSnackbarState {
  state: boolean;
  options: MessageSnackbarOptions;
}

interface MessageSnackbarOptions {
  anchorOrigin: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  autoHideDuration: number;
  message: string;
  variant: string;
}

export interface MessageSnackbarProps {
  children?: ReactChild;
}

export type ContainerState = MessageSnackbarState;
