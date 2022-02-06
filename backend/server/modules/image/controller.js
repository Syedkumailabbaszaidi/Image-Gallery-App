import logger, { init, responded } from '../../config/logger';
import ImageService from './service';
import {
  errorResponseNormalizer,
  successResponseNormalizer,
} from '../../shared/normalizers/response';
import { statusCodes } from '../../shared/utils/constants';

/**
 * @name uploadAttachment
 * @desc Upload attachment
 * @param {object} req
 * @param {object} res
 * @returns {Promise}
 */
const uploadImage = async (req, res) => {
  const { info, error } = logger('images/upload', (req.user || {}).id);
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
 * @name fetchAttachment
 * @desc fetch attachment
 * @param {object} req
 * @param {object} res
 * @returns {Promise}
 */
const fetchImage = async (req, res) => {
  const { info, error } = logger('images/fetch', (req.user || {}).id);
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

const fetchImages = async (req, res) => {
  const { info, error } = logger('images/fetch', (req.user || {}).id);
  try {
    info(init);
    const { user } = req;
    const response = await ImageService.fetchImages(user);
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
  fetchImage,
  fetchImages,
  deleteImage,
};
