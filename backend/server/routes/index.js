import authRouter from '../modules/auth/routes';

const routes = (app) => {
  app.use('/api/auth', authRouter);
};

export default routes;
