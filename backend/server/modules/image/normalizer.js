export const normalizeFetchedImages = (images, sharedWithMe) => {
  const imagesSharedWithMe = sharedWithMe.map((sharedImage) => sharedImage.image);

  return {
    images,
    images_count: images.length,
    shared_with_me_count: sharedWithMe.length,
    shared_with_me: imagesSharedWithMe,
  };
};
