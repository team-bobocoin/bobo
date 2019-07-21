import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

export type UserModel = mongoose.Document & {
    email: string,
    role: string,
    name: string,
    description: string,
    address: string,
    privateKey: string,
};

const name = 'User';

let User: Model<UserModel>;

const schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, index: true },
    role: { type: String, required: true, enum: ['helper', 'helpee'] },
    name: String,
    description: String,
    address: String,
    privateKey: String,
}, {
    timestamps: true,
});

try {
    User = mongoose.model(name);
} catch (err) {
    new MongooseAutoIncrementID(schema, name).applyPlugin();
    User = mongoose.model(name, schema, undefined, true);
}

export default User;
