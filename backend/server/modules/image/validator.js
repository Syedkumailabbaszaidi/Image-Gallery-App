/* eslint-disable consistent-return */
import { body, param } from 'express-validator';
import { IMAGE_MESSAGES } from '../../constants/messages';
import { getFileExtention } from '../../shared/utils/file';
import UserRepo from '../../db/repositories/user';

const allowAttachmentExtensions = ['png', 'jpg', 'jpeg'];
const allowSize = 160000000;

/**
 * @name ImageValidation
 * @desc validate attachment payload
 * @param {string} method
 * @return {string} error[]
 */
const ImageValidation = (method) => {
  switch (method) {
    case 'param': {
      return [
        param('id').notEmpty().withMessage(IMAGE_MESSAGES.ID_IS_INVALID),
        body('users').isArray().withMessage(IMAGE_MESSAGES.SHARED_USERS_REQUIRED),
      ];
    }

    case 'upload': {
      return [
        body('images').custom((attachments, { req }) => {
          const { files } = req;
          if (files) {
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              if (file.size > allowSize) {
                throw new Error(IMAGE_MESSAGES.IMAGE_SIZE_ERROR);
              }
              if (!allowAttachmentExtensions.includes(getFileExtention(file.originalname))) {
                throw new Error(IMAGE_MESSAGES.IMAGE_TYPE_ERROR);
              }
            }
          } else {
            throw new Error(IMAGE_MESSAGES.IMAGE_IS_REQUIRED);
          }

          return true;
        }),
      ];
    }
    default:
      break;
  }
};

export default ImageValidation;
