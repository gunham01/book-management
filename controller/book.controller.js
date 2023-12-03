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

/**
 * Render trang Danh sách sách
 */
router.get('/', async (_, response) => {
    response.render('book/books', { books: await BookModel.find({}) });
});

/**
 * Render trang Tạo sách
 */
router.get('/create', (_, response) => {
    response.render('book/create-book');
});

/**
 * Xử lý hành động khi tạo sách
 */
router.post('/', upload.single('cover'), async (request, response) => {
    request.body.cover = request.file.filename;
    const book = request.body;
    await BookModel.create(book);

    response.render('/book/books', { books: await BookModel.find({}) });
});


router.get('/:id', async (request, response) => {
    response.render('book/update-book', {
        book: await BookModel.findById(request.params.id),
    });
});

/**
 * Xử lý hành động khi tạo sách
 */
router.put('/', upload.single('cover'), async (request, response) => {
    request.body.cover = request.file.filename;
    const book = request.body;
    await BookModel.updateOne(book);

    response.redirect('/book/books');
});


router.delete('/:id', async (request, response) => {
    await BookModel.findByIdAndDelete(request.params.id);
    response.render('book/books', { books: await BookModel.find({}) });
});

module.exports = router;
