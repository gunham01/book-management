const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const UserModel = require('./model/user.model');
require('./database/mongoose.database');
const hash = require('./utils/hasher');
const verifyToken = require('./middleware/jwt.middleware');
const authorize = require('./middleware/authorize.middleware');

// Tạo sẵn 1 tài khoản admin
(async () => {
    const adminCount = await UserModel.countDocuments({ username: 'admin' });
    if (adminCount > 0) return;

    try {
        await UserModel.create({
            fullname: 'Admin',
            username: 'admin',
            password: hash('admin'),
            role: 'ADMIN',
            email: 'admin@vnua.edu.vn',
        });
        console.log('Tạo admin thành công');
    } catch (error) {
        console.error('Tạo admin thất bại');
        console.error(error);
    }
})();

const app = express();

app.set('views', './view'); // Nói thư mục view nằm ở đâu
app.set('view engine', 'pug'); // Nói với express là view engine là pug
// View engine là gì? Nó giúp express hiểu được các file pug (như kiểu 1 chương trình dịch)

app.use(cookieParser());

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));

//mount routers
app.use('/books', require('./controller/book.controller'));

app.use('/login', require('./controller/login.controller'));

app.use(
    '/users',
    verifyToken,
    authorize('admin'),
    require('./controller/user.controller')
);
app.get('/', (_, response) => response.redirect('/login'));
app.get('/logout', (_, response) => {
    ['token', 'username'].forEach((key) => response.clearCookie(key));
    response.redirect('/login');
});
// app.use('/logout', require('./controller/logout'));

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});
