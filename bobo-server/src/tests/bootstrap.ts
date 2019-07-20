import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';

import { connectDB } from '../config/database';
import Passport from '../models/Passport';
import User from '../models/User';

export const server = request(app);

export const up = async () => {
    await connectDB();

    const user = await User.create({
        email: 'user2@naver.com',
        role: 'helper',
    });

    const passport = await Passport.create({
        owner: user._id,
        password: 'user1234',
    });

    const res = await server.post('/signin')
        .send({
            email: 'user2@naver.com',
            password: 'user1234',
        });

    return {
        userID: user._id,
        cookie: res.header['set-cookie'][0],
    };
};

export const down = async () => {
    await User.deleteMany({});
    await Passport.deleteMany({});

    await mongoose.disconnect();
};
