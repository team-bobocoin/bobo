import { Request, Response } from 'express';
import passport from 'passport';

import Passport from '../models/Passport';
import User from '../models/User';
import { UserModel } from '../models/User';
import { createKeyPair, faucet } from '../services/cosmos.service';

export const signup = async (req: Request, res: Response) => {
    req.check('email', 'Email is not valid').isEmail();
    req.check('password', 'Password must be at least 6 characters long')
        .len({ min: 6 });
    req.check('confirmPassword', 'Passwords do not match')
        .equals(req.body.password);
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
    req.check('role', 'Role is required').notEmpty().isString();

    const errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    let newUser: any;

    try {
        const keyPair = await createKeyPair();

        await faucet(keyPair);

        const query = {
            email: req.body.email,
            role: req.body.role,
            name: req.body.name,
            description: req.body.description,
            address: keyPair.address,
            privateKey: keyPair.privateKey,
        };

        newUser = await User.create(query);

        await Passport.create({
            password: req.body.password,
            owner: newUser._id,
        });

        res.status(200).send({message: 'ok'});
    } catch (err) {
        if (newUser) {
            await User.remove({
                _id: newUser._id,
            });
        }

        return res.status(400).send(err);
    }
};

export let login = (req: Request, res: Response) => {
    req.assert('email', 'Email is not valid.').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors: any = req.validationErrors();

    if (errors) {
        return res.status(400).send({message: errors[0].msg});
    }

    passport.authenticate('local', (err: Error, user: UserModel) => {
        if (err) { return res.status(400).send(err); }

        req.logIn(user, (e) => {
            if (err) { return res.status(400).send(e); }

            req.session.user = user;

            res.status(200).send(user);
        });
    })(req, res);
};

export let logout = (req: Request, res: Response) => {
    req.logout();

    return res.status(200).send({message: 'ok'});
};

export let updatePassword = async (req: Request, res: Response) => {
    req.assert('password', 'password must be at least 4 characters long').
        len({ min: 4 });
    req.assert('newPassword', 'newPassword must be at least 4 characters long').
        len({ min: 4 });
    req.assert('confirmPassword', 'Passwords do not match').
        equals(req.body.newPassword);

    const errors: any = req.validationErrors();

    if (errors) {
        return res.status(400).send({message: errors[0].msg});
    }

    try {
        const userPassport = await Passport.findOne({ owner: req.user._id });
        if (!userPassport) {
            return res.status(400).send({message: 'Pssport not found.'});
        }

        const isMatch = await userPassport.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(400).send({message: 'Password is wrong.'});
        }

        userPassport.password = req.body.newPassword;
        await userPassport.save();

        return res.status(200).send({message: 'ok'});
    } catch (err) {
        return res.status(500).send({message: 'Internal server error.'});
    }
};
