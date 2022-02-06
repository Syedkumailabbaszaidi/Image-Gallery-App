import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { initialState } from './slice';

const selectDomain = ({ auth }: RootState) => auth || initialState;

export const selectAuth = createSelector([selectDomain], (authState) => authState);
