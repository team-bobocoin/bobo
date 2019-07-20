import bluebird from 'bluebird';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';

import { MONGODB_URI, SESSION_SECRET } from '../util/secrets';

export const connectDB = () => {
    (mongoose as any).Promise = bluebird;
    return mongoose.connect(MONGODB_URI);
};
