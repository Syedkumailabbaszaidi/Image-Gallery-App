export const getComposedFileName = (photoId, width, format) => {
  return `${photoId}x${width}.${format}`;
};

export const getSizeByIndex = (index) => {
  return this.widths[index];
};

export const getFileExtention = (fileName) => {
  const lastDot = fileName.lastIndexOf('.') + 1;
  return fileName.slice(lastDot, fileName.length);
};

export const removeFileExtention = (fileName) => {
  const lastDot = fileName.lastIndexOf('.');
  return fileName.slice(0, lastDot);
};

export const getSizeFromKey = (key) => {
  const lastX = key.lastIndexOf('x');
  return key.slice(lastX + 1, lastX + 4);
};

export const removeSizeAndIdFromKey = (key) => {
  const lastX = key.lastIndexOf('x');
  return key.slice(0, lastX);
};
