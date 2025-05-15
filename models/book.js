const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sales: {
        type: Number,
        default: 0
    },
    edition: {
        type: Number,
        required: true
    },
    publication: {
        type: String,
        required: true
    }

})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;