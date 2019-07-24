import cors from 'cors';
import { CorsOptions } from 'cors';

const allowOrigins = [
    '',
];

const options: CorsOptions = {
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    origin: process.env.NODE_ENV === 'production'
    ?  true
    : true,
};

const corsConfig = cors(options);

export default corsConfig;
