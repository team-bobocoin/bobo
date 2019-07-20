import express from 'express';
import {Request, Response} from 'express';

import * as passportConfig from '../config/passport';
import * as helpeeController from '../controllers/helpee';
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

export default router;
