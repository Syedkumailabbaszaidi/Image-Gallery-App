import authRouter from '../modules/auth/routes';
import imageRouter from '../modules/image/routes';

const routes = (app) => {
  app.use('/api/auth', authRouter);
  app.use('/api/images', imageRouter);
};

export default routes;
