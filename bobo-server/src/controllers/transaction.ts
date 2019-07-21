import { Request, Response } from 'express';
import _ from 'lodash';

import Transaction from '../models/Transaction';
import * as queryBuilder from '../util/query-builder';

export const find = async (req: Request, res: Response) => {
    const params = req.query;

    const [query, projection, options] = queryBuilder.build(params);

    let promise = Transaction.find(query, projection, options);

    promise = queryBuilder.populate(promise, params.populates);

    try {
        const countPromise = Transaction.count(query);

        const [transactions, count] = await Promise.all<any>([promise, countPromise]);

        return res.status(200).send({
            transactions,
            total: count,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Internal server error.'});
    }
};

export const findByID = async (req: Request, res: Response) => {
    const params = req.query;

    params.query._id = req.params.id;

    let promise = Transaction.findOne(params.query);

    try {
        const populates = JSON.parse(params.populates);

        _.forEach(populates, (populate) => {
            promise = promise.populate(populate);
        });
    } catch (err) {
        // Do nothing
    }

    try {
        const transaction = await promise;

        return res.status(200).send(transaction);
    } catch (err) {
        return res.status(500).send({message: 'Internal server error.'});
    }
};
