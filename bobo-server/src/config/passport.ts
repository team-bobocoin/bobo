import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import passport from 'passport';
import passportLocal from 'passport-local';

import Passport from '../models/Passport';
import User from '../models/User';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({
                email: email.toLowerCase(),
            });

            if (!user) {
                return done({message: 'User not found.'});
            }

            const userPassport = await Passport.findOne({
                owner: user._id,
            });

            if (!userPassport) {
                return done({message: `Passport not found.`});
            }

            const isMatch = await userPassport.comparePassword(password);

            if (!isMatch) {
                return done({message: 'Password wrong.'});
            }

            done(undefined, user);
        } catch (err) {
            done({message: "Can't login"});
        }
    }));

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

export let isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({message: 'Unauthenticated'});
    }

    return next();
};

export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    const provider = req.path.split('/').slice(-1)[0];

    if (_.find(req.user.tokens, { kind: provider })) {
        next();
    } else {
        res.redirect(`/auth/${provider}`);
    }
};
