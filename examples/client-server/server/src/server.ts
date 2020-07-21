import { ApiServer } from '@miracledevs/paradigm-express-webapi';
import cors from 'cors';
import express from 'express';
import { UserController } from './controllers/user.controller';

export class Server extends ApiServer
{
    /**
     * Configures the server before starting.
     */
    protected configureApplication(): void
    {
        this.logger.debug("Configuring application...");
        const port = process.env.PORT || 5000;

        this.expressApplication
            .disable('etag')
            .set('port', port)
            .use(cors())
            .use(express.urlencoded({ extended: false }))
            .use(express.json())
            .listen(port, () => this.logger.debug(`Listening on: http://localhost:${port}`));

        this.registerController(UserController);
    }
}