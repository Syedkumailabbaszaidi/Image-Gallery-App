import { IUser } from 'app/modules/auth/ducks/types';

export interface ImageState {
  loading: boolean;
  images: IImage[];
  imagesCount: number;
  sharedWithMe: IImage[];
  sharedWithMeCount: number;
}

export interface IFetchImagesResponse {
  images: IImage[];
  images_count: number;
  shared_with_me: IImage[];
  shared_with_me_count: number;
}

export interface IImage {
  id: string;
  userId: string;
  sizes: ISize[];
  shared: IShared[];
  createdAt: string;
}

export interface IShared {
  id: number;
  imageId: string;
  sharedWith: number;
  user: IUser;
}

export interface ISize {
  id: string;
  imageId: string;
  size: string;
  url: string;
}
