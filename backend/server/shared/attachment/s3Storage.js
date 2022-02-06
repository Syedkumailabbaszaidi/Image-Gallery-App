import AWS, { config } from 'aws-sdk';
import ENV from '../../config/env';

const BUCKET_NAME = ENV.AWS_S3_STORAGE_BUCKET_NAME;

config.update({
  accessKeyId: ENV.AWS_S3_STORAGE_ACCESS_KEY_ID,
  secretAccessKey: ENV.AWS_S3_STORAGE_SECRET_ACCESS_KEY,
  region: ENV.AWS_REGION,
});

const s3 = new AWS.S3();

/**
 * @name uploadAttachment
 * @desc upload attachment to AWS S3 bucket
 * @param {string} attachment
 * @param {string} key
 * @return Promise
 */
const uploadAttachment = async (image, key) => {
  const params = {
    Bucket: BUCKET_NAME,
    Body: image,
    Key: key,
  };
  try {
    return s3.upload(params).promise();
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * @name fetchAttachmnet
 * @desc fetch attachment from AWS S3 bucket and create read stream
 * @param {string} key
 * @return Promise
 */
const fetchAttachment = async (key, downlaodType) => {
  let BUCKET = '';
  if (downlaodType === 'hobby') BUCKET = HOBBY_IMAGE_BUCKET;
  else if (downlaodType === 'postAttachment') BUCKET = POST_ATTACHMENT_BUCKET;
  else if (downlaodType === 'user_profile') BUCKET = USER_PROFILE_BUCKET;
  else BUCKET = ATTACHMENT_BUCKET;
  const params = {
    Bucket: BUCKET,
    Key: key,
  };
  const image = await s3.getObject(params).createReadStream();
  return image;
};
const fetchImagePath = (key) => {
  // eslint-disable-next-line
  return ENV.AWS_S3_BUCKET_URL + '/' + key;
};

const deleteImage = async (key, imageType) => {
  const BUCKET = imageType === 'hobby' ? HOBBY_IMAGE_BUCKET : ATTACHMENT_BUCKET;
  const params = {
    Bucket: BUCKET,
    Key: key,
  };
  const image = await s3.deleteObject(params).promise();
  return image;
};

module.exports = {
  uploadAttachment,
  fetchAttachment,
  fetchImagePath,
  deleteImage,
};
