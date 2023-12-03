const express = require('express');
const UserModel = require('../model/user.model');


const router = express.Router();

router.get('/', async (_, response) => {
    response.render('users', { users: await UserModel.find({}) });
});

router.get('/create', (_, response) => {
    response.render('create-user');
});

router.post('/', async (request, response) => {
    const user = request.body;
    await UserModel.create(user);

    response.render('/users', { users: await UserModel.find({}) });
});

router.get('/:id', async (request, response) => {
    response.render('update-user', {
        user: await UserModel.findById(request.params.id),
    });
});

router.put('/', async (request, response) => {
    const user = request.body;
    await UserModel.updateOne(user);

    response.render('users', { users: await UserModel.find({}) });
});

router.delete('/:id', async (request, response) => {
    await UserModel.deleteOne({ _id: request.params.id });
    response.render('users', { users: await UserModel.find({}) });
});

module.exports = router;