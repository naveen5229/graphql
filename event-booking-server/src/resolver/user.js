const bcrypt = require('bcrypt');
const User = require('../mongo-models/users.mongo');
const { getEventLists } = require('./common');
const jwt = require('jsonwebtoken');


const userResolver = {
    users: async () => {
        try {
            const users = await User.find()
            return users.map(user => {
                return { ...user._doc, eventList: getEventLists.bind(this, user._doc.eventList) }
            })
        } catch (err) {
            throw err;
        }
    },

    createUser: async args => {
        try {
            const res = await User.findOne({ email: args.userDetail.email })
            if (res) {
                throw new Error('User Already Exists!!')
            }
            const hashedPassword = await bcrypt.hash(args.userDetail.password, 12)
            const user = new User({
                email: args.userDetail.email,
                password: hashedPassword
            })
            const newUser = await user.save();
            return { ...newUser._doc }
        } catch (err) {
            throw err;
        }
    },

    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User not found!!');
        }
        const passCheck = await bcrypt.compare(password, user.password);
        if (!passCheck) {
            throw new Error('Wrong password!!');
        }
        const token = jwt.sign({
            userId: user.id
        }, 'mysecretcode', { expiresIn: 60 * 60 });
        return {
            userId: user.id,
            token,
            tokenExpiration: 60*60
        }
    }
}

module.exports = userResolver;