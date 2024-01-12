import logger from './logger';
import { SetupServer } from './server';
import config from 'config';

(async (): Promise<void> => {
  try {
    const server = new SetupServer(config.get('App.port'));
    await server.init();
    server.start();
  } catch (error) {
    logger.error('App exited with error: ' + error);
    process.exit(1);
  }
})();
