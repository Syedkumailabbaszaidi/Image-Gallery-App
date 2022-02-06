import { body } from 'express-validator';
import UserRepo from '../../db/repositories/user';
import { EMAIL_MESSAGES, PASSWORD_MESSAGES, NAME_MESSAGES } from '../../constants/messages';
import { PASSWORD_VALIDATOR_STRING } from '../../shared/validators/password';

const AuthValidation = (method) => {
  switch (method) {
    case 'login': {
      return [
        body('email')
          .notEmpty()
          .withMessage(EMAIL_MESSAGES.EMAIL_IS_REQUIRED)
          .bail()

          .isEmail()
          .withMessage(EMAIL_MESSAGES.EMAIL_IS_INVALID)
          .bail()

          .custom(async (email) => {
            if (!email.trim()) {
              throw new Error(EMAIL_MESSAGES.EMAIL_IS_INVALID);
            }
            return true;
          }),
        body('password').notEmpty().withMessage(PASSWORD_MESSAGES.PASSWORD_IS_REQUIRED),
      ];
    }

    case 'register': {
      return [
        body('name')
          .notEmpty()
          .withMessage(NAME_MESSAGES.NAME_IS_REQUIRED)
          .bail()

          .isLength({ min: 3 })
          .withMessage(NAME_MESSAGES.NAME_LENGTH_ERROR)
          .bail()

          .custom(async (name) => {
            if (!name.trim() || name.length < 3) {
              throw new Error(NAME_MESSAGES.NAME_IS_INVALID);
            }
            return true;
          }),

        body('email')
          .notEmpty()
          .withMessage(EMAIL_MESSAGES.EMAIL_IS_REQUIRED)
          .bail()

          .isEmail()
          .withMessage(EMAIL_MESSAGES.EMAIL_IS_INVALID)
          .bail()

          .custom(async (email) => {
            if (!email.trim()) {
              throw new Error(EMAIL_MESSAGES.EMAIL_IS_INVALID);
            }
            const emailExists = await UserRepo.fetchUser({ email });

            if (emailExists) {
              throw new Error(EMAIL_MESSAGES.EMAIL_ALREADY_EXISTS);
            }
            return true;
          }),

        body('password')
          .notEmpty()
          .withMessage(PASSWORD_MESSAGES.PASSWORD_IS_REQUIRED)
          .bail()

          .isLength({ min: 8 })
          .withMessage(PASSWORD_MESSAGES.PASSWORD_LENGTH_ERROR)
          .bail()

          .matches(/[a-z]/i)
          .withMessage(PASSWORD_MESSAGES.PASSWORD_CONTAINS_ATLEAST_ONE_LETTER)
          .bail()

          .matches(/[0-9]/)
          .withMessage(PASSWORD_MESSAGES.PASSWORD_CONTAINS_ATLEAST_ONE_NUMBER)
          .bail()

          .matches(PASSWORD_VALIDATOR_STRING)
          .withMessage(PASSWORD_MESSAGES.PASSWORD_VALIDATION_GENERIC_ERROR),
      ];
    }

    default:
      break;
  }
};

export default AuthValidation;
