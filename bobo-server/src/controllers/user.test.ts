import {connectDB} from '../config/database';
import Passport from '../models/Passport';
import User from '../models/User';
import {down, server} from '../tests/bootstrap';

describe('UserController', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterEach(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        await down();
    });

    describe('POST /signup', () => {
        describe('with valid parameters', () => {
            it('returns 200 ok', async () => {
                const res = await server.post('/signup')
                    .send({
                        email: 'hannut1@naver.com',
                        password: 'yunseok2',
                        confirmPassword: 'yunseok2',
                        role: 'helper',
                    });

                expect(res.status).toEqual(200);
            });

        });

        describe('without email', () => {
            it('returns 400 error', () => {
                return server.post('/signup')
                    .send({
                        password: 'yunseok2',
                        confirmPassword: 'yunseok2',
                    })
                    .expect(400)
                    .then((res) => {
                        expect(res.body[0].msg).toEqual('Email is not valid');
                    });
            });
        });

        describe('with different confirmPassword', () => {
            it('returns 400 error', () => {
                return server.post('/signup')
                    .send({
                        email: 'hannut1@naver.com',
                        password: 'yunseok2',
                        confirmPassword: 'PASSWORD',
                    })
                    .expect(400)
                    .then((res) => {
                        expect(res.body[0].msg).toEqual('Passwords do not match');
                    });
            });
        });

        describe('with too short password', () => {
            it('returns 400 error', () => {
                return server.post('/signup')
                    .send({
                        email: 'hannut1@naver.com',
                        password: 'yun2',
                        confirmPassword: 'yun2',
                    })
                    .expect(400)
                    .then((res) => {
                        expect(res.body[0].msg).toEqual('Password must be at least 6 characters ' +
                            'long');
                    });
            });
        });

        describe('with existing email', () => {
            beforeEach(async () => {
                await User.create({
                    email: 'hannut1@naver.com',
                    role: 'helper',
                });
            });

            it('returns 400 error', async () => {
                const res = await server.post('/signup')
                    .send({
                        email: 'hannut1@naver.com',
                        password: 'yunseok2',
                        confirmPassword: 'yunseok2',
                        role: 'helper',
                    });

                expect(res.status).toBe(400);
                expect(res.body.errmsg).toMatch(/dup key/);
            });
        });

        describe('with wrong role', () => {
            it('returns error', async () => {
                const res = await server.post('/signup')
                    .send({
                        email: 'hannut1@naver.com',
                        password: 'yunseok2',
                        confirmPassword: 'yunseok2',
                        role: 'wrong',
                    });

                expect(res.status).toBe(400);
            });
        });
    });

    describe('Post /signin', () => {
        describe('with valid information', () => {
            const role = 'helper';

            beforeEach(async () => {
                const user = await User.create({
                    email: 'hannut1@naver.com',
                    role,
                });

                await Passport.create({
                    owner: user._id,
                    password: 'yunseok2',
                });
            });

            it('returns 200', async () => {
                const res = await server.post('/signin')
                    .send({
                        email: 'hannut1@naver.com',
                        password: 'yunseok2',
                    });

                const user = res.body;

                expect(user.role).toBe(role);
            });
        });

        describe('with blank email', () => {
            it('returns 400 error', () => {
                return server.post('/signin')
                    .send({
                        password: 'yunseok2',
                    })
                    .expect(400)
                    .then((res) => {
                        expect(res.body.message).toMatch('Email is not valid.');
                    });
            });
        });

        describe('with blank email', () => {
            it('returns 400 error', () => {
                return server.post('/signin')
                    .send({
                        email: 'hannut1@naver.com',
                    })
                    .expect(400)
                    .then((res) => {
                        expect(res.body.message).toMatch('Password cannot be blank');
                    });
            });
        });

        describe('with not existing user', () => {
            it('returns 400 error', () => {
                return server.post('/signin')
                    .send({
                        email: 'hannut1@naver.com',
                        password: 'yunseok2',
                    })
                    .expect(400)
                    .then((res) => {
                        expect(res.body.message).toMatch('User not found.');
                    });
            });
        });

        describe('with wrong password', () => {
            beforeEach(async () => {
                const user = await User.create({
                    email: 'hannut1@naver.com',
                    role: 'helper',
                });

                await Passport.create({
                    owner: user._id,
                    password: 'yunseok2',
                });
            });

            it('returns 400 error', () => {
                return server.post('/signin')
                    .send({
                        email: 'hannut1@naver.com',
                        password: 'wrongPassword',
                    })
                    .expect(400)
                    .then((res) => {
                        expect(res.body.message).toMatch('User not found.');
                    });
            });
        });
    });

    describe('GET /logout', () => {
        it('returns 200', () => {
            return server.get('/logout')
                .expect(200);
        });
    });

    describe('PUT /password', () => {
        const email = 'hannut1@naver.com';
        const originalPassword = 'yunseok2';
        const newPassword = 'hannut1';

        let cookie: string;
        let userID: number;

        beforeEach(async () => {
            const user = await User.create({
                email,
                role: 'helper',
            });

            userID = user._id;

            await Passport.create({
                owner: user._id,
                password: originalPassword,
            });

            await server.post('/signin')
                .send({
                    email,
                    password: originalPassword,
                })
                .then((res) => {
                    cookie = res.header['set-cookie'][0];
                });
        });

        describe('with valid params', () => {
            it('returns 200', async () => {
                await server.put('/password')
                    .send({
                        password: originalPassword,
                        newPassword,
                        confirmPassword: newPassword,
                    })
                    .set('cookie', cookie)
                    .expect(200);

                const userPassport: any = await Passport.findOne({
                    owner: userID,
                });

                const isMatch = await userPassport.comparePassword(newPassword);
                expect(isMatch).toBeTruthy();
            });
        });

        describe('when password is wrong', () => {
            it('returns 200', async () => {
                await server.put('/password')
                    .send({
                        password: 'Wrong password',
                        newPassword,
                        confirmPassword: newPassword,
                    })
                    .set('cookie', cookie)
                    .expect(400)
                    .then((res) => {
                        expect(res.body.message).toMatch('Password is wrong.');
                    });
            });
        });

        describe('when not logged in', () => {
            it('returns 400 error', () => {
                return server.put('/password')
                    .send({
                        password: originalPassword,
                        newPassword,
                        confirmPassword: newPassword,
                    })
                    .expect(401)
                    .then((res) => {
                        expect(res.body.message).toMatch('Unauthenticated');
                    });
            });
        });

        describe('with empty password param', () => {
            it('returns 400 error', () => {
                return server.put('/password')
                    .send({
                        newPassword,
                        confirmPassword: newPassword,
                    })
                    .set('cookie', cookie)
                    .expect(400)
                    .then((res) => {
                        expect(res.body.message).toMatch('password must be at least 4 characters ' +
                            'long');
                    });
            });
        });

        describe('with empty newPassword param', () => {
            it('returns 400 error', () => {
                return server.put('/password')
                    .send({
                        password: originalPassword,
                        confirmPassword: newPassword,
                    })
                    .set('cookie', cookie)
                    .expect(400)
                    .then((res) => {
                        expect(res.body.message).toMatch('newPassword must be at least 4 ' +
                            'characters long');
                    });
            });
        });

        describe('when newPassword not equals to confirmPassword', () => {
            it('returns 400 error', () => {
                return server.put('/password')
                    .send({
                        password: originalPassword,
                        newPassword,
                        confirmPassword: 'Different Password',
                    })
                    .set('cookie', cookie)
                    .expect(400)
                    .then((res) => {
                        expect(res.body.message).toMatch('Passwords do not match');
                    });
            });
        });
    });
});
