import { ERROR_MESSAGE } from '../../constants/messages';
import { extractError } from '../handlers/error';

export const errorResponseNormalizer = (err) => ({
  success: false,
  message: extractError(err) || err.message || err.error || err || ERROR_MESSAGE,
});

export const successResponseNormalizer = (message, data = null) => {
  let response = {
    success: true,
    message: message,
  };

  if (data !== null) {
    response.data = data;
    if (data.rows && Object.keys(data.rows).length === 0) {
      response.data = {
        count: 0,
        rows: [],
      };
      return response;
    }

    if (Object.keys(data).length === 0) {
      response.data = {};
      return response;
    }
  }

  return response;
};
