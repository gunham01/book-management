const express = require('express');
const UserModel = require('../model/user.model');
const hash = require('../utils/hasher');
const verifyToken = require('../middleware/jwt.middleware');
const authorize = require('../middleware/authorize.middleware');
const router = express.Router();

const roles = {
    ADMIN: 'admin',
    USER: 'user',
};

router.get('/', verifyToken, authorize('admin'), async (request, response) => {
    response.render('user/users', {
        users: await UserModel.find({}),
        username: request.cookies.username,
        role: request.cookies.role,
    });
});

router.get('/create', verifyToken, authorize('admin'), (request, response) => {
    response.render('user/create-user', {
        username: request.cookies.username,
        role: request.cookies.role,
    });
});

router.post('/', verifyToken, authorize('admin'), async (request, response) => {
    const user = request.body;
    user.password = hash(user.password);
    await UserModel.create(user);
    response.redirect('/users');
});

router.post('/register', async (request, response) => {
    const user = request.body;
    console.log('[INFO]  user:', user);
    await UserModel.create({ ...user, password: hash(user.password) });
    response.redirect('/users');
});

router.get(
    '/:id/update',
    verifyToken,
    authorize('admin'),
    async (request, response) => {
        response.render('user/update-user', {
            user: await UserModel.findById(request.params.id),
            username: request.cookies.username,
            role: request.cookies.role,
        });
    }
);

router.post(
    '/:id',
    verifyToken,
    authorize('admin'),
    async (request, response) => {
        const userId = request.params.id;
        const user = request.body;
        if (!user.password) { // nếu user.password khác null, undefined, 0, false, '' thì mới thực hiện 
            const savedUser = await UserModel.findById(request.params.id);
            user.password = savedUser.password;
        }
        if (!user.role) {
            user.role = roles.USER;
        }

        user.password = hash(user.password);

        await UserModel.findByIdAndUpdate(userId, user);
        response.redirect('/users');
    }
);

router.get(
    '/:id/delete',
    verifyToken,
    authorize('admin'),
    async (request, response) => {
        await UserModel.deleteOne({ _id: request.params.id });
        response.redirect('/users');
    }
);

module.exports = router;
