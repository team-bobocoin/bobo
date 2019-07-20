import bodyParser from 'body-parser';
import compression from 'compression';
import { RequestHandler } from 'express';
import expressValidator from 'express-validator';
import helmet from 'helmet';
import passport from 'passport';

import corsConfig from '../config/cors';
import sessionConfig from '../config/session';

const middlewares: RequestHandler[] = [
    helmet(),
    compression(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    sessionConfig,
    passport.initialize(),
    passport.session(),
    expressValidator(),
    corsConfig,
];

export default middlewares;
