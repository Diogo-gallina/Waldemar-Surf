import logger from './logger';
import { SetupServer } from './server';
import config from 'config';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

(async (): Promise<void> => {
  try {
    const server = new SetupServer(config.get('App.port'));
    await server.init();
    server.start();

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.forEach((sig) =>
      process.on(sig, async () => {
        try {
          await server.close();
          logger.info('App exited with success');
          process.exit(ExitStatus.Success);
        } catch (error) {
          logger.error('App exited with error ' + error);
          process.exit(ExitStatus.Failure);
        }
      })
    );
  } catch (error) {
    logger.error('App exited with error: ' + error);
    process.exit(ExitStatus.Failure);
  }
})();
