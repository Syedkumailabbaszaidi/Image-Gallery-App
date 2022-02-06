import ImageController from './controller';
import ImageValidation from './validator';
import * as middleware from '../../shared/middlewares/authentication';
import APIValidator from '../../shared/validators/api';
const multer = require('multer');

const upload = multer();

const express = require('express');

const router = express.Router();

router.post(
  '/upload',
  middleware.authenticateUser,
  upload.array('images', 8),
  APIValidator(ImageValidation('upload')),
  ImageController.uploadImage,
);
router.get('/', middleware.authenticateUser, ImageController.fetchImages);

export default router;
