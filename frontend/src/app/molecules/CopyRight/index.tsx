import { Typography } from '@mui/material';
import { ReactElement, memo } from 'react';
import { Link } from '@mui/material';

const Copyright = (props: any): ReactElement => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://kumailzaidi.com/" target="_blank">
        www.kumailzaidi.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default memo(Copyright);
