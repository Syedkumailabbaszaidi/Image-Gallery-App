import ENV from './config/env';
import Server from './config/Server';
import routes from './routes';

const main = async () => {
  const server = new Server().router(routes);
  await server.setupSwagger();
  server.listen(ENV.PORT);
};

main();
