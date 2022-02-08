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
  ImageListItemBar,
  Tooltip,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TagFriendDialog from './TagFriendDialog';
import { generateImageList } from 'utils/helpers';

const ImagesTab = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { images } = useAppSelector(({ image }) => image);
  const [imagesData, setImagesData] = useState([]);
  const [showLightBox, setShowLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [taggedFriends, settaggedFriends] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const galleryRef: RefObject<ImageGallery> = createRef();

  useEffect(() => {
    if (images) {
      const imagesList = generateImageList(images);
      setImagesData(imagesList);
    }
  }, [images]);

  useEffect(() => {
    getData();
    /* eslint-disable-next-line*/
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

  const handleShareButtonClick = (image: any) => {
    setSelectedImageId(image.imageId);
    settaggedFriends(image.sharedWith);
    setDialogOpen(true);
  };

  const handleDialogClose = (success?: boolean) => {
    setSelectedImageId(null);
    setDialogOpen(false);
    if (success) {
      getData();
    }
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
                    <ImageListItemBar
                      sx={{
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                      }}
                      position="top"
                      actionIcon={
                        <>
                          <Tooltip title="Tag Friend">
                            <IconButton
                              sx={{ color: 'white' }}
                              onClick={() => handleShareButtonClick(image)}
                            >
                              <ShareIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={`Tagged ${image.sharedWith?.length || 0} friends`}>
                            <>
                              <VisibilityIcon sx={{ color: 'white', mr: 1 }} />
                              <span className="text-sm text-white">
                                {image.sharedWith?.length || 0}
                              </span>
                            </>
                          </Tooltip>
                        </>
                      }
                      actionPosition="left"
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
      <TagFriendDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        selectedImageId={selectedImageId}
        taggedFriends={taggedFriends}
      />
    </>
  );
};

export default memo(ImagesTab);
