import { amber, blue, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';
import { memo, ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { hideMessage } from './ducks/slice';
import { MessageSnackbarProps } from './ducks/types';

const StyledSnackbar = styled(Snackbar)(({ theme, variant }: any) => ({
  '& .MessageSnackbar-content': {
    ...(variant === 'success' && {
      backgroundColor: green[600],
      color: '#FFFFFF',
    }),

    ...(variant === 'error' && {
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.getContrastText(theme.palette.error.dark),
    }),

    ...(variant === 'info' && {
      backgroundColor: blue[600],
      color: '#FFFFFF',
    }),

    ...(variant === 'warning' && {
      backgroundColor: amber[600],
      color: '#FFFFFF',
    }),
  },
}));

const variantIcon: any = {
  success: 'check_circle',
  warning: 'warning',
  error: 'error_outline',
  info: 'info',
};

const MessageSnackbar = (props: MessageSnackbarProps): ReactElement => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(({ message }) => message.state);
  const options = useAppSelector(({ message }) => message.options);

  return (
    <StyledSnackbar
      {...options}
      open={state}
      onClose={() => dispatch(hideMessage())}
      ContentProps={{
        variant: 'body2',
        headlineMapping: {
          body1: 'div',
          body2: 'div',
        },
      }}
    >
      <SnackbarContent
        className="MessageSnackbar-content"
        message={
          <div className="flex items-center">
            {variantIcon[options.variant] && (
              <Icon color="inherit">{variantIcon[options.variant]}</Icon>
            )}
            <Typography className="mx-8">{options.message}</Typography>
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => dispatch(hideMessage())}
            size="large"
          >
            <Icon>close</Icon>
          </IconButton>,
        ]}
      />
    </StyledSnackbar>
  );
};

export default memo(MessageSnackbar);
