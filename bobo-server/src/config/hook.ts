import Passport from '../models/Passport';
import User from '../models/User';

const defaultUsers = [{
    email: 'user@naver.com',
    password: 'user1234',
    role: 'helper',
}];

const createDefaultUser = () => {
    defaultUsers.forEach(async (defaultUser) => {
        try {
            const user = await User.findOne({
                email: defaultUser.email,
            });

            if (user) { return; }

            const newUser = await User.create({
                email: defaultUser.email,
                role: 'helper',
            });

            await Passport.create({
                owner: newUser._id,
                password: defaultUser.password,
            });
        } catch (err) {
            console.error(err);
        }
    });
};

export const hook = () => {
    createDefaultUser();
};
