import express from 'express';

import { connectDB } from './config/database';
import { hook } from './config/hook';
import middlewares from './config/middleware';
import { setRouters } from './routers/index';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(middlewares);

setRouters(app);

export default app;
