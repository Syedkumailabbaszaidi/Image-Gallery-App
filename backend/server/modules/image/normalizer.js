import attachments from '../../shared/attachment';
import ENV from '../../config/env';
const storageSystem = ENV.ATTACHMENT_SYSTEM;

export const normalizeFetchedImages = (images) => {
  const normalizedImages = { ...images };
  let rows = [];
  normalizedImages.rows.forEach((normalizedImage) => {
    rows = rows.concat(normalizedImage.sizes);
  });

  rows = rows.map((row) => {
    row.url = attachments[storageSystem].fetchImagePath(row.url);
    return row;
  });
  normalizedImages.rows = rows;
  return normalizedImages;
};
