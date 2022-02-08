import { ReactChild } from 'react';

export interface AuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
}

export interface AuthProps {
  children?: ReactChild;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface ILoginFormRequest extends ILoginForm {}

export interface ILoginFormResponse {
  user: any;
  token: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
