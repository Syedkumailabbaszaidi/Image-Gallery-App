import request from 'utils/axios';
import { HTTP_METHODS } from 'configs/httpConstants';
import { API_BASE_URL } from 'configs/env';

const BASE_URL = `${API_BASE_URL}/api/images`;

export const fetchImages = async () => {
  const params = {
    url: BASE_URL,
    method: HTTP_METHODS.GET,
  };
  return request(params);
};

export const tagImage = async (imageId: string, users: string[]) => {
  const params = {
    url: `${BASE_URL}/${imageId}/tag`,
    method: HTTP_METHODS.PUT,
    data: { users },
  };
  return request(params);
};

export const uploadImages = async (images: any) => {
  const params = {
    url: `${BASE_URL}/upload`,
    method: HTTP_METHODS.POST,
    data: images,
  };
  return await request(params);
};
