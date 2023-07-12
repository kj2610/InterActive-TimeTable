const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    id: {
        type: 'string',
        required: true
    },
    pass: {
        type: 'string',
        required: true
    }
})

const db = mongoose.model('login', schema)

module.exports = db