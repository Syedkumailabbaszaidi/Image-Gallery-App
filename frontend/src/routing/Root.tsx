import { ReactElement, Suspense } from 'react';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from 'store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MessageSnackbar from 'app/molecules/SnackMessage/index';
import ThemeProvider from 'app/providers/ThemeProvider';
import { setupInterceptors } from 'utils/axios';
import Login from 'app/modules/auth/Login';
import PrivateRoutes from './PrivateRoutes';
import Register from 'app/modules/auth/Register';

setupInterceptors({ debug: false });

const App = (): ReactElement => {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <ThemeProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Router>
              <Routes>
                <Route path="/" element={<PrivateRoutes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<>Not Found</>} />
              </Routes>
            </Router>
          </Suspense>
          <MessageSnackbar />
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  );
};

export default App;
