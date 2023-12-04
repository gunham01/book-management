const express = require('express');
const BookModel = require('../model/book.model');

const router = express.Router();

router.get('/', (_, response) => {
    response.render('login');
});

router.post('/', async (request, response) => {
    const { username, password } = request.body;
    if (username === 'admin' && password === 'admin') {
        response.render('book/books', { books: await BookModel.find({}) });
    } else {
        response.render('login', { error: 'Tài khoản hoặc mật khẩu không đúng' });
    }
});

module.exports = router;