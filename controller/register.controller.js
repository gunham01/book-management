const express = require('express');
const BookModel = require('../model/book.model');
const UserModel = require('../model/user.model');
const crypto = require('crypto');
const config = require('../config');

const router = express.Router();
const hmac = crypto.createHmac('sha256', config.secretkey);

function hash(str) {
    return hmac.update(str).digest('hex');
}

router.get('/', (_, response) => {
    response.render('register');
});

router.post('/', async (request, response) => {
    const { password, ...userInfo } = request.body;
    await UserModel.create({ ...userInfo, password: hash(password) });
    response.render('login');
});
