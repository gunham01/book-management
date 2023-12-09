function authorize(role) {
    return (request, response, next) => {
        if (request.user.role === role) {
            next();
        } else {
            response.render('not-found', {
                username: request.cookies.username,
            });
        }
    };
}

module.exports = authorize;
