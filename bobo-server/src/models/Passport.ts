import bcrypt from 'bcrypt-nodejs';
import { NextFunction } from 'express';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

type comparePasswordFunction = (candidatePassword: string) => Promise<boolean>;

export type PassportModel = mongoose.Document & {
    password: string

    owner: number

    comparePassword: comparePasswordFunction,
};

const name = 'Passport';

let Passport: Model<PassportModel>;

const hash = function(next: NextFunction) {
    const passport = this;

    if (!passport.isModified('password')) { return next(); }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(passport.password, salt, undefined,
            (e: mongoose.Error, h) => {
                if (e) { return next(e); }

                passport.password = h;
                next();
            });
    });
};

const comparePassword: comparePasswordFunction = function(
    candidatePassword: any,
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password,
            (err: mongoose.Error, isMatch: boolean) => {
                if (err) {
                    return reject(err);
                }

                resolve(isMatch);
            });
    });
};

const schema = new mongoose.Schema({
    password: String,

    owner: {type: Number, ref: 'User'},
}, {
    timestamps: true,
});

schema.method({
    comparePassword,
});

schema.pre('save', hash);

try {
    Passport = mongoose.model(name);
} catch (err) {
    new MongooseAutoIncrementID(schema, name).applyPlugin();
    Passport = mongoose.model(name, schema);
}

export default Passport;
