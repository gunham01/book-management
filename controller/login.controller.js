const express = require('express');
const UserModel = require('../model/user.model');
const hash = require('../utils/hasher');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();

router.get('/', (request, response) => {
    if (request.cookies.token) {
        response.redirect('/books');
    } else {
        response.render('login');
    }
});

router.post('/', async (request, response) => {
    const { username, password } = request.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
        response.render('login', {
            error: 'Tài khoản hoặc mật khẩu không đúng',
        });
    } else {
        if (hash(password) === user.password) {
            const token = jwt.sign(
                { username: user.username, role: user.role },
                config.secretkey
            );
            response.cookie('token', token);
            response.cookie('username', user.username);
            response.redirect('/books');
        } else {
            response.render('login', {
                error: 'Tài khoản hoặc mật khẩu không đúng',
            });
        }
    }
});

module.exports = router;
