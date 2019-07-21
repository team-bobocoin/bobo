import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

export type TransactionModel = mongoose.Document & {
    hash: string,
    from: string,
    to: string,
    amount: number,
    memo: string,
    type: string,
};

const name = 'Transaction';

let Transaction: Model<TransactionModel>;

const schema = new mongoose.Schema({
    hash: {type: String, required: true},
    from: String,
    to: String,
    amount: Number,
    memo: String,
    type: String,
}, {
    timestamps: true,
});

try {
    Transaction = mongoose.model(name);
} catch (err) {
    new MongooseAutoIncrementID(schema, name).applyPlugin();
    Transaction = mongoose.model(name, schema, undefined, true);
}

export default Transaction;
