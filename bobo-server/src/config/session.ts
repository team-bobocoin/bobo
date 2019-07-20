import mongo from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';

import { MONGODB_URI, SESSION_SECRET } from '../util/secrets';

const MongoStore = mongo(session);

const sessionConfig = session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000,

        // Prod
        // secure: true,

        // Dev
        secure: false,
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
    }),
});

export default sessionConfig;
