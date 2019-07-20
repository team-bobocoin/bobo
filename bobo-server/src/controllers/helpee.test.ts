import User from '../models/User';
import { down, server, up } from '../tests/bootstrap';

describe('HelpeeController', () => {
    let userID: number;
    let cookie: string;
    let user: any;

    beforeAll(async () => {
        const data = await up();
        userID = data.userID;
        cookie = data.cookie;
    });

    beforeEach(async () => {
        user = await User.create({
            email: 'helpee1@naver.com',
            role: 'helpee',
            name:  '자원봉사자',
            description:  '저는 자원봉사자입니다.',
        });
    });

    afterEach(async () => {
        await User.deleteOne({
            _id: user._id,
        });
    });

    afterAll(async () => {
        await down();
    });

    describe('GET /helpees', () => {
        it('returns helpees', async () => {
            const res = await server.get('/helpees')
                .set('cookie', cookie);

            const helpees = res.body.helpees;

            expect(res.status).toBe(200);
            expect(res.body.helpees.length).toBe(1);
            expect(helpees[0].email).toBeUndefined();
            expect(helpees[0].name).toBe(user.name);
            expect(helpees[0].description).toBe(user.description);
        });
    });

    describe('GET /helpees/:id', () => {
        it('returns helpee', async () => {
            const res = await server.get(`/helpees/${user._id}`)
                .set('cookie', cookie);

            const helpee = res.body;

            expect(res.status).toBe(200);

            expect(helpee.name).toBe(user.name);
            expect(helpee.email).toBeUndefined();
        });
   });
});
