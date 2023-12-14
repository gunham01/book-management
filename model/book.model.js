const mongoose = require('mongoose');

// Định nghĩa cấu trúc của bảng books
const tableStructure = new mongoose.Schema({
    title: String, // Tiêu đề
    description: String, // Mô tả
    author: String, // Tác giả
    publisher: String, // Nhà xuất bản
    publishedYear: Number, // Năm xuất bản
    cover: String, // Bìa
})
const modelName = 'Book';

// Tạo bảng books, và trả về book model
// Book model có thể xem/thêm/sửa/xoá
const BookModel = mongoose.model(modelName, tableStructure);

module.exports = BookModel;
