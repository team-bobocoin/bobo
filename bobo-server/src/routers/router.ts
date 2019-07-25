import express from 'express';
import {Request, Response} from 'express';
import * as path from 'path';

import * as passportConfig from '../config/passport';
import * as cosmosController from '../controllers/cosmos';
import * as helpeeController from '../controllers/helpee';
import * as transactionController from '../controllers/transaction';
import * as userController from '../controllers/user';
import isHelperPolicy from '../policies/is-helper.policy';
import ownerPolicy from '../policies/owner.policy';

const userPolicy = [
    passportConfig.isAuthenticated,
    ownerPolicy,
];

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello wrold');
});

router.get('/genesisFile', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../public/genesis.json'));
});

router.post('/signup', userController.signup);
router.post('/signin', userController.login);
router.get('/logout', userController.logout);
router.put('/password', passportConfig.isAuthenticated,
    userController.updatePassword);

router.get(
    '/helpees',
    passportConfig.isAuthenticated,
    isHelperPolicy,
    helpeeController.getHelpees,
);
router.get(
    '/helpees/:id',
    passportConfig.isAuthenticated,
    isHelperPolicy,
    helpeeController.getHelpeeByID,
);

router.get(
    '/balances',
    passportConfig.isAuthenticated,
    cosmosController.userBalances);

// TODO
router.post(
    '/donates',
    passportConfig.isAuthenticated,
    cosmosController.donates);
router.post(
    '/pay',
    passportConfig.isAuthenticated,
    cosmosController.pay);

router.get(
    '/faucet',
    passportConfig.isAuthenticated,
    cosmosController.getFaucet);

router.get(
    '/transactions',
    transactionController.find);
router.get(
    '/transactions/:id',
    passportConfig.isAuthenticated,
    transactionController.findByID);

export default router;
