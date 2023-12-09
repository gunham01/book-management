const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(request, response, next) {
    try {
        const payload = jwt.verify(request.cookies.token, config.secretkey);
        request.user = payload;
        request.auth = true;
        next();
    } catch (error) {
        console.error(error);
        response.render('login', {
            message: 'Vì lí do bảo mật, vui lòng đăng nhập lại',
        });
    }
}

module.exports = verifyToken;
