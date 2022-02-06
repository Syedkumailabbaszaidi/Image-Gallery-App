import request from 'utils/axios';
import { HTTP_METHODS } from 'configs/httpConstants';
import { API_BASE_URL } from 'configs/env';
import { ILoginFormRequest } from './types';

const AUTH_URL = `${API_BASE_URL}/api/auth`;

export const login = async (credentials: ILoginFormRequest) => {
  const params = {
    url: `${AUTH_URL}/login`,
    method: HTTP_METHODS.POST,
    data: credentials,
    headerVariant: 'public',
  };
  return request(params);
};

export const register = async (credentials: ILoginFormRequest) => {
  const params = {
    url: `${AUTH_URL}/register`,
    method: HTTP_METHODS.POST,
    data: credentials,
    headerVariant: 'public',
  };
  return request(params);
};

export const logout = async () => {
  const params = {
    url: `${AUTH_URL}/logout`,
    method: HTTP_METHODS.GET,
  };
  return request(params);
};
