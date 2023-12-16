const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    fullname: String,
    email: String,
    role: String,
    password: String,
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
