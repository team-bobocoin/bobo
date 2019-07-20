import { Express } from 'express';
import router from './router';
export const setRouters = (app: Express) => {
    app.use('/', router);
};
