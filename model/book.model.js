const mongoose = require('mongoose');

const tableStructure = new mongoose.Schema({
    title: String, 
    description: String, 
    author: String, 
    publisher: String, 
    publishedYear: Number, 
    cover: String, 
})
const modelName = 'Book';

const BookModel = mongoose.model(modelName, tableStructure);

module.exports = BookModel;
