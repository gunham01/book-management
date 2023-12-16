const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const UserModel = require('./model/user.model');
require('./database/mongoose.database');
const hash = require('./utils/hasher');

async function createFirstAdmin() {
    const adminCount = await UserModel.countDocuments({ username: 'admin' });
    if (adminCount > 0) return;

    try {
        await UserModel.create({
            fullname: 'Admin',
            username: 'admin',
            password: hash('admin'),
            role: 'admin',
            email: 'admin@vnua.edu.vn',
        });
        console.log('Tạo admin thành công');
    } catch (error) {
        console.error('Tạo admin thất bại');
        console.error(error);
    }
}
createFirstAdmin();

const app = express();

app.set('views', './view');
app.set('view engine', 'pug');

app.use(cookieParser());

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/books', require('./controller/book.controller'));
app.use('/login', require('./controller/login.controller'));
app.use('/users', require('./controller/user.controller'));

app.get('/', (_, response) => response.redirect('/login'));
app.get('/logout', (_, response) => {
    response.clearCookie('token');
    response.clearCookie('username');
    response.redirect('/books/create');
});
app.get('/register', (_, response) => response.render('register'));

app.listen(4000, () => {
    console.log('App is listening on port 4000');
});
