import AuthProvider from 'app/providers/AuthProvider';
import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

const PrivateRoutes = (): ReactElement => {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<>Home</>} />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </AuthProvider>
  );
};

export default PrivateRoutes;
