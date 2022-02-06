import { ReactElement } from 'react';
import { createTheme, ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const muiTheme = createTheme({});

const ThemeProvider = (props: any): ReactElement => {
  return (
    <MaterialThemeProvider theme={muiTheme}>
      <CssBaseline />
      {props.children}
    </MaterialThemeProvider>
  );
};

export default ThemeProvider;
