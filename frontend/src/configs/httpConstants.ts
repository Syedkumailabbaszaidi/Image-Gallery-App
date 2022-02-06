import { Method } from 'axios';

interface AxiosMethodsMap {
  [key: string]: Method;
}
export const HTTP_METHODS: AxiosMethodsMap = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};
