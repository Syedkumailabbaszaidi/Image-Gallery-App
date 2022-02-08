import { ReactElement, useEffect, useState, createRef, RefObject, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchImages } from './ducks/slice';
import ImageGallery from 'react-image-gallery';

import {
  Box,
  Container,
  IconButton,
  ImageList,
  ImageListItem,
  Tooltip,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { generateImageList } from 'utils/helpers';

const SharedWithMeTab = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { sharedWithMe } = useAppSelector(({ image }) => image);
  const [imagesData, setImagesData] = useState([]);
  const [showLightBox, setShowLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef: RefObject<ImageGallery> = createRef();

  useEffect(() => {
    if (sharedWithMe) {
      const imagesList = generateImageList(sharedWithMe);
      setImagesData(imagesList);
    }
  }, [sharedWithMe]);

  useEffect(() => {
    getData();
    /* eslint-disable-next-line */
  }, []);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
    setShowLightbox(true);
  };

  const handleClose = () => {
    setShowLightbox(false);
  };

  const lightboxCustomControls = () => {
    return (
      <Box className="flex justify-end">
        <Tooltip title="Close">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>
    );
  };

  const getData = () => {
    dispatch(fetchImages());
  };

  return (
    <>
      <Container fixed>
        <Box sx={{ height: '100vh' }}>
          {!showLightBox && (
            <>
              <ImageList gap={1} cols={4}>
                {imagesData.map((image: any, index) => (
                  <ImageListItem key={index} sx={{ cursor: 'pointer' }}>
                    <img
                      src={image.thumbnail}
                      srcSet={`${image.thumbnail}`}
                      alt={''}
                      loading="lazy"
                      onClick={() => {
                        handleClick(index);
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              {!imagesData.length && <Typography className="text-center">No Data</Typography>}
            </>
          )}
        </Box>
      </Container>
      {showLightBox && (
        <ImageGallery
          items={imagesData}
          ref={galleryRef}
          startIndex={currentIndex}
          renderCustomControls={lightboxCustomControls}
        />
      )}
    </>
  );
};

export default memo(SharedWithMeTab);
