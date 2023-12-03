/**
 * Đây giống như là định nghĩa 1 bảng trong Cơ sở dữ liệu
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: String,
    password: String,
    role: String,
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
