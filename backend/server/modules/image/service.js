// import AttachmentRepo from '../../db/repositories/authentication_token';
// import attachments from '../../shared/attachment';
// import AttachmentTypeRepo from '../../repositories/attachment_type';
import ImageRepo from '../../db/repositories/image';
import SharedImageRepo from '../../db/repositories/shared_image';
import ImageSizeRepo from '../../db/repositories/image_size';
import UserRepo from '../../db/repositories/user';
import attachments from '../../shared/attachment';
import { combineCorrespondingIndexes } from '../../shared/utils/array';
import { getFileExtention, getComposedFileName } from '../../shared/utils/file';
import { successResponseNormalizer } from '../../shared/normalizers/response';
import ENV from '../../config/env';
import { normalizeFetchedImages } from './normalizer';
import { IMAGE_MESSAGES, USERS_MESSAGES } from '../../constants/messages';
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
    const createImagePromises = files.map((file, index) => {
      const date = new Date();
      const seconds = date.getSeconds();
      const newDate = new Date().setSeconds(seconds + index);
      return ImageRepo.createImage({
        userId: user.id,
        createdAt: new Date(newDate),
      });
    });

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
        url: attachments[storageSystem].fetchImagePath(
          `${file.id}.${getFileExtention(file.originalname)}`,
        ),
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
          .resize({ width, height: width })
          .toBuffer({ resolveWithObject: true });
        const key = getComposedFileName(file.id, sharpen.info.width, sharpen.info.format);
        imageSizePromises.push(
          ImageSizeRepo.createImageSize({
            imageId: file.id,
            url: attachments[storageSystem].fetchImagePath(key),
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

    combineCorrespondingIndexes(uploadedImages, imageSizes, 'dataValues');

    return successResponseNormalizer(IMAGE_MESSAGES.UPLOAD_SUCCESSFUL);
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
    const images = await ImageRepo.fetchAllImages({ userId: user.id }, [], [], {
      order: [['createdAt', 'DESC']],
    });
    if (!images) {
      return successResponseNormalizer(IMAGES_MESSAGES.IMAGES_NOT_FOUND_ERROR, false, {});
    }

    const sharedWithUser = await SharedImageRepo.findImagesForCurrentUser({ sharedWith: user.id });

    // const stream = await attachments[attachment.storage || storageSystem].fetchAttachment(
    //   attachment.name,
    //   'attachment',
    // );
    // return successResponseNormalizer(ATTACHMENT_MESSAGES.ATTACHMENT_CREATED_MESSAGE, true, stream);
    return normalizeFetchedImages(images, sharedWithUser);
  } catch (err) {
    throw err;
  }
};

const shareImage = async (imageId, user, users) => {
  try {
    const image = await ImageRepo.findRecord({ id: imageId });
    if (!image) {
      throw new Error(IMAGE_MESSAGES.IMAGE_NO_FOUND);
    }
    if (image.userId !== user.id) {
      throw new Error(IMAGE_MESSAGES.NO_RIGHT_TO_TAG);
    }
    if (users.some((item) => item === user.email)) {
      throw new Error(IMAGE_MESSAGES.CANNOT_SHARE_WITH_OWNER);
    }

    const imageSharedPreviously = await SharedImageRepo.findAllRecords({ imageId });

    // deleting previous shared data
    const deletePreviouslySharedPromises = imageSharedPreviously.map((sharedImage) =>
      SharedImageRepo.deleteRecord({ id: sharedImage.id }),
    );

    await Promise.all(deletePreviouslySharedPromises);

    // getting users details
    const usersInDb = await UserRepo.findAllRecords({ email: users });

    if (!usersInDb || usersInDb.length !== users.length) {
      throw new Error(USERS_MESSAGES.USER_NOT_FOUND);
    }

    // adding data
    const sharedImagesePromise = usersInDb.map((userIdDB) =>
      SharedImageRepo.createImage({ imageId, sharedWith: userIdDB.id }),
    );

    await Promise.all(sharedImagesePromise);
    return successResponseNormalizer(IMAGE_MESSAGES.TAG_SUCCESSFULL);
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
  shareImage,
  fetchImages,
  fetchImage,
  deleteImage,
};
