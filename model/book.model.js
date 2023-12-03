/**
 * Đây giống như là định nghĩa 1 bảng trong Cơ sở dữ liệu
 */

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    publisher: String,
    publishedYear: Number,
    cover: String,
    rating: Number,
})

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
