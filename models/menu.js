const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    taste: {
        type: String,
        required: true,
        enum: ["sour", "sweet", "salty"]
    },
    price: {
        type: Number,
        required: true
    },
    sales: {
        type: Number,
        default: 0
    }
})

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;