import { validationResult } from 'express-validator';
import { ERROR_MESSAGE } from '../../constants/messages';
import { statusCodes } from '../utils/constants';

const APIValidator = (validations, type) => async (req, res, next) => {
  let validationValues = validations;
  if (type) {
    validationValues = validations(type, req);
  }
  await Promise.all(validationValues.map((validation) => validation.run(req)));

  const errorsResult = validationResult(req);
  if (errorsResult.isEmpty()) {
    return next();
  }

  const errors = errorsResult
    .array()
    .map((err) => ({ message: err.msg, field: err.param, location: err.location || '' }));

  res.status(statusCodes.BAD_REQUEST).json({
    success: false,
    message: ERROR_MESSAGE,
    error: {
      errors,
    },
  });
};

export default APIValidator;
