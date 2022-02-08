import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from 'store';
import { ImageState, IFetchImagesResponse } from './types';
import * as ImageService from './services';
import { ApiResponse } from 'shared/interfaces';
import { showMessage } from '../../../molecules/SnackMessage/ducks/slice';
import { func } from 'shared/types';

export const initialState: ImageState = {
  images: [],
  loading: false,
  imagesCount: 0,
  sharedWithMe: [],
  sharedWithMeCount: 0,
};

const ImageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    uploadImagesPending(state) {
      return { ...state, loading: true };
    },
    uploadImagesSuccess(state) {
      return {
        ...state,
        loading: false,
      };
    },
    uploadImagesError(state) {
      return { ...state, loading: true };
    },
    fetchImagesPending(state) {
      return { ...state, loading: true };
    },
    fetchImagesSuccess(state, { payload }: PayloadAction<IFetchImagesResponse>) {
      return {
        ...state,
        loading: false,
        images: payload.images,
        sharedWithMe: payload.shared_with_me,
        imagesCount: payload.images_count,
        sharedWithMeCount: payload.shared_with_me_count,
      };
    },
    fetchImagesError(state) {
      state.loading = false;
    },
    tagImagePending(state) {
      return { ...state, loading: true };
    },
    tagImageSuccess(state, { payload }) {
      return {
        ...state,
        loading: false,
      };
    },
    tagImageError(state) {
      state.loading = false;
    },
  },
});

export const { actions: ImageActions, reducer: ImageReducer, name: sliceKey } = ImageSlice;

export const {
  uploadImagesPending,
  uploadImagesSuccess,
  uploadImagesError,
  fetchImagesPending,
  fetchImagesSuccess,
  fetchImagesError,
  tagImagePending,
  tagImageSuccess,
  tagImageError,
} = ImageSlice.actions;

export const fetchImages = () => async (dispatch: AppDispatch) => {
  dispatch(ImageActions.fetchImagesPending());
  try {
    const response: ApiResponse = await ImageService.fetchImages();
    dispatch(ImageActions.fetchImagesSuccess(response.data));
  } catch (error: any) {
    if (error && error.response) {
      const errorObj: ApiResponse = error.response.data;
      dispatch(ImageActions.fetchImagesError());
      dispatch(showMessage({ message: errorObj.message, variant: 'error' }));
    } else {
      dispatch(showMessage({ message: error.message, variant: 'error' }));
    }
  }
};

export const uploadImages = (images: any, onSuccess?: func) => async (dispatch: AppDispatch) => {
  dispatch(ImageActions.uploadImagesPending());
  try {
    await ImageService.uploadImages(images);
    dispatch(ImageActions.uploadImagesSuccess());
    if (onSuccess) {
      onSuccess();
    }
  } catch (error: any) {
    if (error && error.response) {
      const errorObj: ApiResponse = error.response.data;
      dispatch(ImageActions.uploadImagesError());
      dispatch(showMessage({ message: errorObj.message, variant: 'error' }));
    } else {
      dispatch(showMessage({ message: error.message, variant: 'error' }));
    }
  }
};

export const tagImage =
  (imageId: string, users: string[], onSuccess?: func) => async (dispatch: AppDispatch) => {
    dispatch(ImageActions.tagImagePending());
    try {
      const response: ApiResponse = await ImageService.tagImage(imageId, users);
      dispatch(ImageActions.tagImageSuccess(response.data));
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      if (error && error.response) {
        const errorObj: ApiResponse = error.response.data;
        dispatch(ImageActions.tagImageError());
        dispatch(showMessage({ message: errorObj.message, variant: 'error' }));
      } else {
        dispatch(showMessage({ message: error.message, variant: 'error' }));
      }
    }
  };

export default ImageReducer;
