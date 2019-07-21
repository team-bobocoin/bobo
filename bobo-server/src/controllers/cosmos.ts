import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import User from '../models/User';
import { donate, faucet, getBalances, Keypair } from '../services/cosmos.service';

export const userBalances = async (req: Request, res: Response) => {
    const { address } = req.user;

    try {
        const balances = await getBalances(address);

        res.status(200).send(balances);
    } catch (err) {
        res.status(500).send({message: 'Internal server error'});
    }
};

export const getFaucet = async (req: Request, res: Response) => {
    const { address, privateKey } = req.user;

    try {
        await faucet(new Keypair(address, privateKey));

        res.status(200).send();
    } catch (err) {
        res.status(500).send({message: 'Internal server error'});
    }
};

export const donates = async (req: Request, res: Response) => {
    const { address, privateKey } = req.user;

    const { body } = req;

    try {
        const helpee = await User.findOne({
            _id: body.helpeeID,
        });

        const { data } = await donate(
            new Keypair(address, privateKey),
            helpee.address,
            body.amount,
            body.memo,
        );

        await Transaction.create({
            hash: data.txhash,
            type: 'donation',
            from: address,
            to: helpee.address,
            amount: body.amount,
            memo: body.memo,
        });

        res.status(200).send();
    } catch (err) {
        res.status(500).send({message: 'Internal server error'});
    }
};

export const pay = async (req: Request, res: Response) => {
    const { address, privateKey } = req.user;

    const { body } = req;

    try {
        const { data } = await donate(
            new Keypair(address, privateKey),
            'cosmos1nx982k7n0tcuy06gzyhse3sj9c2yshp9aawanp',
            body.amount,
            body.memo,
        );

        await Transaction.create({
            hash: data.txhash,
            type: 'pay',
            from: address,
            to: 'cosmos1nx982k7n0tcuy06gzyhse3sj9c2yshp9aawanp',
            amount: body.amount,
            memo: body.memo,
        });

        res.status(200).send();
    } catch (err) {
        res.status(500).send({message: 'Internal server error'});
    }
};
