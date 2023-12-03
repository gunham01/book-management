const mongoose = require('mongoose');
const config = require('../config');

mongoose.connection.on('connected', () => {
	console.log('Mongodb connected successful!');
})

mongoose.connection.on('error', (err) => {
	console.log(err);
})

function connectDB() {
    mongoose.connect(config.dbURI);
}

connectDB();
module.exports = {}