import { IImage, ISize } from 'app/modules/image/ducks/types';

export const generateImageList = (images: any) => {
  return images.map((image: IImage) => {
    const original: ISize | any = image.sizes.find((size: ISize) => size.size === 'original');
    const thumbnail: ISize | any = image.sizes.find((size: ISize) => size.size === '450');
    return {
      imageId: image.id,
      original: original.url,
      thumbnail: thumbnail.url,
      sharedWith: image.shared,
    };
  });
};

export const getNameInitials = (name: string): string => {
  const getAllInitials = name.match(/(^\S\S?|\b\S)?/g);
  const getAllInitialsJoined = (getAllInitials || ['']).join('');
  const getSpecificInitials = getAllInitialsJoined.match(/(^\S|\S$)?/g);
  return (getSpecificInitials || []).join('').toUpperCase();
};
