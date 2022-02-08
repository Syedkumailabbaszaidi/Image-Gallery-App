import logger, { init, responded } from '../../config/logger';
import ImageService from './service';
import {
  errorResponseNormalizer,
  successResponseNormalizer,
} from '../../shared/normalizers/response';
import { statusCodes } from '../../shared/utils/constants';
import { IMAGE_MESSAGES } from '../../constants/messages';

/**
 * @name uploadImages
 * @desc Upload images
 * @param {object} req
 * @param {object} res
 * @returns {Promise}
 */
const uploadImage = async (req, res) => {
  const { info, error } = logger('images/uploadImage', (req.user || {}).id);
  try {
    info(init);
    const { files, user } = req;
    const response = await ImageService.uploadImage(files, user);
    res.json(response);
    info(responded);
  } catch (err) {
    error(err);
    const errRes = errorResponseNormalizer(err);
    res.status(statusCodes.BAD_REQUEST).json(errRes);
  }
};

/**
 * @name fetchImage
 * @desc fetch image
 * @param {object} req
 * @param {object} res
 * @returns {Promise}
 */
const fetchImage = async (req, res) => {
  const { info, error } = logger('images/fetchImage', (req.user || {}).id);
  try {
    info(init);
    const { user } = req;
    const { id } = req.params;
    const response = await ImageService.fetchImage(id, user);
    if (response.success) {
      response.data.pipe(res);
    } else {
      res.json(response);
    }
    info(responded);
  } catch (err) {
    error(err);
    const errRes = errorResponseNormalizer(err);
    res.status(statusCodes.BAD_REQUEST).json(errRes);
  }
};

/**
 * @name fetchImages
 * @desc fetch images
 * @param {object} req
 * @param {object} res
 * @returns {Promise}
 */
const fetchImages = async (req, res) => {
  const { info, error } = logger('images/fetchImages', (req.user || {}).id);
  try {
    info(init);
    const { user } = req;
    const images = await ImageService.fetchImages(user);

    const response = successResponseNormalizer(IMAGE_MESSAGES.FETCH_SUCCESSFULL, images);
    res.json(response);
    info(responded);
  } catch (err) {
    error(err);
    const errRes = errorResponseNormalizer(err);
    res.status(statusCodes.BAD_REQUEST).json(errRes);
  }
};

/**
 * @name shareImage
 * @desc Share Image with other users
 * @param {object} req
 * @param {object} res
 * @returns {Promise}
 */
const shareImage = async (req, res) => {
  const { info, error } = logger('images/shareImage', (req.user || {}).id);
  try {
    info(init);
    const { body, user, params } = req;
    const response = await ImageService.shareImage(params.id, user, body.users);
    res.json(response);
    info(responded);
  } catch (err) {
    error(err);
    const errRes = errorResponseNormalizer(err);
    res.status(statusCodes.BAD_REQUEST).json(errRes);
  }
};

/**
 * @name deleteAttachment
 * @desc delete attachment
 * @param {object} req
 * @param {object} res
 * @returns {Promise}
 */
const deleteImage = async (req, res) => {
  const { info, error } = logger('images/delete', (req.user || {}).id);
  try {
    info(init);
    const { user } = req;
    const { id } = req.params;
    const response = await ImageService.deleteImage(id, user);
    res.json(response);
    info(responded);
  } catch (err) {
    error(err);
    const errRes = errorResponseNormalizer(err);
    res.status(statusCodes.BAD_REQUEST).json(errRes);
  }
};

export default {
  uploadImage,
  shareImage,
  fetchImage,
  fetchImages,
  deleteImage,
};
