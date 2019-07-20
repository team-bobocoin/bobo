import { NextFunction, Request, Response } from 'express';

export default (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (req.user.role !== 'helper') {
        return res.status(401).send({message: 'Unauthenticated'});
    }

    next();
};
