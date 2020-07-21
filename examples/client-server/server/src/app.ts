import { HostBuilder, ConfigurationBuilder, Logger, LogType } from '@miracledevs/paradigm-express-webapi';
import { Server } from './server';

new HostBuilder()
    .useLogging((logger: Logger) => logger.setMinimumLevel(LogType.Trace))
    .build(Server)
    .start();