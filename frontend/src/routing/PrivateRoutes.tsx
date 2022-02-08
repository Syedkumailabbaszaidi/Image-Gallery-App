import Layout1 from 'app/Layouts/layout1';
import Home from 'app/pages/Home';
import AuthProvider from 'app/providers/AuthProvider';
import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

const PrivateRoutes = (): ReactElement => {
  return (
    <AuthProvider>
      <Layout1>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<>Not found</>} />
        </Routes>
      </Layout1>
    </AuthProvider>
  );
};

export default PrivateRoutes;
