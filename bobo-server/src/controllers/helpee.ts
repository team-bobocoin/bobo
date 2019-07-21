import { Request, Response } from 'express';
import User from '../models/User';

export const getHelpees = async (req: Request, res: Response) => {
    try {
        const helpees = await User.find({
            role: 'helpee',
        }, 'name description');

        res.status(200).send({helpees});
    } catch (err) {
        console.error(err);

        res.status(500).send({message: 'Internal server error'});
    }
};

export const getHelpeeByID = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const helpee = await User.findOne({ _id: id }, 'name description address');

        res.status(200).send(helpee);
    } catch (err) {
        console.error(err);

        res.status(500).send({message: 'Internal server error'});
    }
};
