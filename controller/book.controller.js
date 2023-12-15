/**
 * Đây là file tập hợp các API liên quan tới sách
 * - API xem sách
 * - API thêm sách
 * - API sửa sách
 * - API xoá sách
 */

const express = require('express');
const BookModel = require('../model/book.model');
const multer = require('multer');
const verifyToken = require('../middleware/jwt.middleware');

const router = express.Router();
const upload = multer({
    storage: multer.diskStorage({
        destination: (_, __, cb) => {
            cb(null, './public/img/cover');
        },
        filename: (_, file, cb) => {
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix);
        },
    }),
});

// Trang quản lý sách
router.get('/', async (request, response) => {
    const books = await BookModel.find({});
    response.render('book/books', {
        books: books,
        username: request.cookies.username,
        role: request.cookies.role, //Phân quyền
    });
});

// Trang tạo sách
router.get('/create', verifyToken, (request, response) => {
    response.render('book/create-book', {
        username: request.cookies.username,
        role: request.cookies.role,
    });
});

// Khi bấm tạo sách
router.post(
    '/',
    verifyToken,
    upload.single('cover'),
    async (request, response) => {
        request.body.cover = request.file.filename;
        const book = request.body;
        await BookModel.create(book);

        response.redirect('/books');
    }
);

// Trang cập nhật sách
router.get('/:id/update', async (request, response) => {
    response.render('book/update-book', {
        book: await BookModel.findById(request.params.id),
        username: request.cookies.username,
        role: request.cookies.role,
    });
});

// Khi bấm cập nhật sấch
router.post(
    '/:id',
    verifyToken,
    upload.single('cover'),
    async (request, response) => {
        if (request.file) {
            request.body.cover = request.file.filename;
        }

        const book = request.body;
        await BookModel.updateOne(book);

        response.redirect('/books');
    }
);

// Khi bấm xoá sách
router.get('/:id/delete', verifyToken, async (request, response) => {
    await BookModel.findByIdAndDelete(request.params.id);
    response.redirect('/books');
});

module.exports = router;
