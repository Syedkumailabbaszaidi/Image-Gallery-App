// import AttachmentRepo from '../../db/repositories/authentication_token';
// import attachments from '../../shared/attachment';
// import AttachmentTypeRepo from '../../repositories/attachment_type';
import ImageRepo from '../../db/repositories/image';
import ImageSizeRepo from '../../db/repositories/image_size';
import attachments from '../../shared/attachment';
import { combineCorrespondingIndexes } from '../../shared/utils/array';
import { getFileExtention, getComposedFileName } from '../../shared/utils/file';
import { successResponseNormalizer } from '../../shared/normalizers/response';
import ENV from '../../config/env';
import { normalizeFetchedImages } from './normalizer';
const sharp = require('sharp');

const storageSystem = ENV.ATTACHMENT_SYSTEM;

const widths = [150, 450];

/**
 * @name uploadAttachment
 * @desc upload attachment
 * @param {Object} payload
 * @param {Object} user
 * @returns {Promise}
 */
const uploadImage = async (files, user) => {
  try {
    // Generating Image Ids
    const createImagePromises = files.map((file) =>
      ImageRepo.createImage({
        userId: user.id,
      }),
    );

    const createdImages = await Promise.all(createImagePromises);

    // Combining image ids to file objects
    const combinedDataOfFilesAndImages = combineCorrespondingIndexes(
      files,
      createdImages,
      'dataValues',
    );

    let imageSizePromises = combinedDataOfFilesAndImages.map((file) =>
      ImageSizeRepo.createImageSize({
        imageId: file.id,
        url: `${file.id}.${getFileExtention(file.originalname)}`,
        size: 'original',
      }),
    );

    let uploadImageToBucketPromises = combinedDataOfFilesAndImages.map((file) =>
      attachments[storageSystem].uploadAttachment(
        file.buffer,
        `${file.id}.${getFileExtention(file.originalname)}`,
      ),
    );

    for (let i = 0; i < widths.length; i++) {
      const width = widths[i];
      for (let j = 0; j < combinedDataOfFilesAndImages.length; j++) {
        const file = combinedDataOfFilesAndImages[j];
        const sharpen = await sharp(file.buffer)
          .resize({ width })
          .toBuffer({ resolveWithObject: true });
        const key = getComposedFileName(file.id, sharpen.info.width, sharpen.info.format);
        imageSizePromises.push(
          ImageSizeRepo.createImageSize({
            imageId: file.id,
            url: key,
            size: sharpen.info.width.toString(),
          }),
        );
        uploadImageToBucketPromises.push(
          attachments[storageSystem].uploadAttachment(sharpen.data, key),
        );
      }
    }

    const imageSizes = await Promise.all(imageSizePromises);

    const uploadedImages = await Promise.all(uploadImageToBucketPromises);
    return combineCorrespondingIndexes(uploadedImages, imageSizes, 'dataValues');
  } catch (err) {
    throw err;
  }
};

/**
 * @name fetchAttachment
 * @desc fetch attachment
 * @param {string} id
 * @param {Object} user
 * @returns {Promise}
 */
const fetchImage = async (id) => {
  try {
    const attachment = await ImageRepo.fetchAttachment({ id, is_deleted: false });
    if (!attachment) {
      return successResponseNormalizer(ATTACHMENT_MESSAGES.ATTACHMENT_NOT_FOUND_ERROR, false, {});
    }
    const stream = await attachments[attachment.storage || storageSystem].fetchAttachment(
      attachment.name,
      'attachment',
    );
    return successResponseNormalizer(ATTACHMENT_MESSAGES.ATTACHMENT_CREATED_MESSAGE, true, stream);
  } catch (err) {
    throw err;
  }
};

/**
 * @name fetchAttachment
 * @desc fetch attachment
 * @param {string} id
 * @param {Object} user
 * @returns {Promise}
 */
const fetchImages = async (user) => {
  try {
    const images = await ImageRepo.fetchAllImagesAndCount({ userId: user.id });
    if (!images) {
      return successResponseNormalizer(IMAGES_MESSAGES.IMAGES_NOT_FOUND_ERROR, false, {});
    }
    // const stream = await attachments[attachment.storage || storageSystem].fetchAttachment(
    //   attachment.name,
    //   'attachment',
    // );
    // return successResponseNormalizer(ATTACHMENT_MESSAGES.ATTACHMENT_CREATED_MESSAGE, true, stream);
    return normalizeFetchedImages(images);
  } catch (err) {
    throw err;
  }
};

/**
 * @name deleteAttahment
 * @desc delete attahment
 * @param {string} id
 * @param {Object} user
 * @returns {Promise}
 */
const deleteImage = async (id, user) => {
  try {
    // return models.sequelize.transaction(async (transaction) => {
    //   const attachment = await AttachmentRepo.fetchAttachment(
    //     { id, user_id: user.id, is_deleted: false },
    //     { transaction },
    //   );
    //   if (!attachment) {
    //     return successResponseNormalizer(ATTACHMENT_MESSAGES.ATTACHMENT_NOT_FOUND_ERROR, true);
    //   }
    //   await AttachmentRepo.deleteAttachment({ id, user_id: user.id }, { transaction });
    //   return successResponseNormalizer(ATTACHMENT_MESSAGES.ATTACHMENT_DELETED_MESSAGE, true);
    // });
    return true;
  } catch (err) {
    throw err;
  }
};

export default {
  uploadImage,
  fetchImages,
  fetchImage,
  deleteImage,
};
