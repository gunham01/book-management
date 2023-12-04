const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('./database/mongoose.database');

// const parseToken = require('./middleware/parseToken');
const app = express();

app.set('views', './view');
app.set('view engine', 'pug');

app.use(cookieParser());
// app.use(parseToken);

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));

//mount routers
app.use('/books', require('./controller/book.controller'));
app.use('/login', require('./controller/login.controller'));
app.use('/users', require('./controller/user.controller'));
// app.use('/logout', require('./controller/logout'));


app.listen(3000, () => {
	console.log('App is listening on port 3000');
});