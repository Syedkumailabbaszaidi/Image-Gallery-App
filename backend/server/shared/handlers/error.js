import { ERRORS_MAPPING } from '../../constants/messages';
import { statusCodes } from '../../shared/utils/constants';

export const extractError = (error) => {
  if (Array.isArray(error.errors) && error.errors.length > 0) {
    return error.errors.map(({ message }) => message);
  }
  const message = ERRORS_MAPPING[error.message] || error.message;
  return message;
};

export const errorHandler = (err, req, res) => {
  res.status(err.status || statusCodes.INTERNAL_ERROR);
  res.send(`<h1>${err.status || statusCodes.INTERNAL_ERROR} Error</h1>``<pre>${err.message}</pre>`);
};
