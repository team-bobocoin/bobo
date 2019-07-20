import { NextFunction, Request, Response } from 'express';
import * as typeChecker from '../util/type-checker';

export default (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    switch (req.method) {
        case 'GET':
        case 'DELETE':
            try {
                req.query.query = JSON.parse(req.query.query);
                req.query.query.owner = req.user._id;
            } catch (err) {
                req.query.query = {owner: req.user._id};
            }
            break;
        case 'PUT':
            if (typeChecker.isObject(req.body.query)) {
                req.body.query.owner = req.user._id;
            } else {
                req.body.query = {owner: req.user._id};
            }
            break;
        case 'POST':
            req.body.owner = req.user._id;
            break;
    }

    next();
};
