import { ReactElement, useEffect, useState, memo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { logout } from 'app/modules/auth/ducks/slice';
import { Avatar, Input, Button, Menu, MenuItem, Tooltip, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useNavigate } from 'react-router-dom';
import { getNameInitials } from 'utils/helpers';
import UploadIcon from '@mui/icons-material/Collections';
import { fetchImages, uploadImages } from 'app/modules/image/ducks/slice';

const Appbar = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector(({ auth }) => auth);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarText, setAvatarText] = useState<string>('');

  useEffect(() => {
    if (user) {
      const nameInitials = getNameInitials(user.name);
      setAvatarText(nameInitials);
    }
  }, [user]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout(onLogoutSuccess));
  };

  const onLogoutSuccess = () => {
    navigate('/');
  };

  const handleInputChange = ({ target }: any) => {
    if (target.files.length) {
      const form = new FormData();
      const files = Object.values(target.files) || [];
      files.forEach((file: any) => {
        form.append('images', file);
      });
      setIsUploading(true);
      dispatch(uploadImages(form, handleUploadFinish));
    }
  };

  const handleUploadFinish = () => {
    setIsUploading(false);
    dispatch(fetchImages());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Image Gallery App
          </Typography>
          <div className="flex items-center">
            {isUploading && (
              <Tooltip title="Images are being uploaded">
                <CircularProgress color="inherit" size={20} sx={{ mr: 2 }} />
              </Tooltip>
            )}
            <label htmlFor="contained-button-file">
              <Input
                inputProps={{ accept: 'image/*', multiple: true }}
                id="contained-button-file"
                type="file"
                hidden
                className="hidden"
                onChange={handleInputChange}
              />
              <Button
                variant="outlined"
                component="span"
                color="inherit"
                startIcon={<UploadIcon />}
                sx={{ mr: 2 }}
              >
                Upload
              </Button>
            </label>
            <IconButton
              onClick={handleMenu}
              size="small"
              aria-controls={anchorEl ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? 'true' : undefined}
            >
              <Avatar>{avatarText}</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default memo(Appbar);
