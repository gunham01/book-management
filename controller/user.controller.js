const express = require('express');
const UserModel = require('../model/user.model');
const hash = require('../utils/hasher');
const router = express.Router();

router.get('/',  async (request, response) => {
    response.render('user/users', {
        users: await UserModel.find({}),
        username: request.cookies.username,
    });
});

router.get('/create', (request, response) => {
    response.render('user/create-user', { username: request.cookies.username });
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
    });
});

router.put('/', async (request, response) => {
    const user = request.body;
    await UserModel.updateOne(user);
    response.redirect('/users');
});

router.get('/:id/delete', async (request, response) => {
    await UserModel.deleteOne({ _id: request.params.id });
    response.redirect('/users');
});

module.exports = router;
