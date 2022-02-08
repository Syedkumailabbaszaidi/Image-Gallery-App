import axios, { Method } from 'axios';
import { getFromLocal, removeFromLocal } from './cache';
import { TOKEN_KEY } from 'configs/env';

interface requestArgs {
  url: string;
  method: Method;
  data?: any;
  params?: any;
  cancelToken?: any;
  customHeaders?: any;
  headerVariant?: string;
}

interface interceptorsConfig {
  debug: boolean;
}

const getToken = async () => {
  return getFromLocal(TOKEN_KEY, false) || '';
};

export const onGetToken = async (): Promise<string | boolean> => {
  const token = await getToken();
  return token ? token : false;
};

export const onGetHeaders = async (type: string): Promise<any> => {
  const ALL_TYPES = ['authorization', 'public'];
  if (!type) {
    throw new Error('request func internal onGetHeaders arg @param type is missing');
  }
  if (!ALL_TYPES.includes(type)) {
    throw new Error(`
      request func internal onGetHeaders arg @param type can only be
      ${ALL_TYPES.join(',')}
    `);
  }
  if (type === 'authorization') {
    const authorizationToken = await onGetToken();
    return {
      authorization: `Bearer ${authorizationToken}`,
    };
  }
  if (type === 'public') {
    return {
      'Content-Type': 'application/json',
    };
  }
  return {};
};

const request = async ({
  url,
  method,
  data,
  params,
  cancelToken,
  customHeaders,
  headerVariant = 'authorization',
  ...rest
}: requestArgs) => {
  if (!url) {
    throw new Error('request func arg @param url is missing');
  }
  if (!method) {
    throw new Error(
      'request func arg @param method is missing. Valid options "GET"|"POST"|"PUT" etc',
    );
  }

  const authHeaders = await onGetHeaders(headerVariant);

  const headers = { ...customHeaders, ...authHeaders };

  try {
    const result = await axios(url, {
      method,
      headers,
      ...(data && { data }),
      ...(params && { params }),
      ...(cancelToken && { cancelToken }),
      ...rest,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const setupInterceptors = ({ debug = false }: interceptorsConfig) => {
  const echo = (obj: any) => {
    if (obj.show) {
      console.error(obj.message);
    }
  };

  axios.interceptors.response.use(
    (response) => {
      echo({ show: debug, type: 'dir', message: response });
      return response;
    },
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status } = error.response;
        if (status === 401) {
          removeFromLocal(TOKEN_KEY);
          removeFromLocal('user');
          window.location.href = '/';
        }
      } else if (error.request) {
        echo({ show: debug, type: 'dir', message: error.request });
      } else {
        echo({
          show: debug,
          type: 'warn',
          message: `Something occurred setting the request that set off an error ${error.message}`,
        });
      }
      return Promise.reject(error);
    },
  );
};

export default request;
