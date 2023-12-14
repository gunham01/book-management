const express = require('express');
const UserModel = require('../model/user.model');
const hash = require('../utils/hasher');
const router = express.Router();

const roles = {
    ADMIN: 'admin',
    USER: 'user',
};

router.get('/', async (request, response) => {
    response.render('user/users', {
        users: await UserModel.find({}),
        username: request.cookies.username,
        role: request.cookies.role,
    });
});

router.get('/create', (request, response) => {
    response.render('user/create-user', {
        username: request.cookies.username,
        role: request.cookies.role,
    });
});

router.post('/', async (request, response) => {
    const user = request.body;
    await UserModel.create({ ...user, password: hash(user.password) });
    response.redirect('/users');
});

router.get('/:id/update', async (request, response) => {
    response.render('user/update-user', {
        user: await UserModel.findById(request.params.id),
        username: request.cookies.username,
        role: request.cookies.role,
    });
});

router.post('/:id', async (request, response) => {
    const user = request.body;
    if (!user.password) {
        const savedUser = await UserModel.findById(request.params.id);
        user.password = savedUser.password;
    }
    if (!user.role) {
        user.role = roles.USER;
    }

    await UserModel.updateOne(user);
    response.redirect('/users');
});

router.get('/:id/delete', async (request, response) => {
    await UserModel.deleteOne({ _id: request.params.id });
    response.redirect('/users');
});

module.exports = router;
