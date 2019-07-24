import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

export const ENVIRONMENT = process.env.NODE_ENV;

let envFile;

switch (ENVIRONMENT) {
    case 'production':
        envFile = '.env';
        break;
    case 'test':
        envFile = '.env.test';
        break;
    default:
        envFile = '.env.test';
}

logger.debug('current environment: ', ENVIRONMENT);

if (!fs.existsSync(envFile)) {
    logger.debug(`${envFile} file not exist`);
}

dotenv.config({ path: envFile });

export const SESSION_SECRET = process.env.SESSION_SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;
