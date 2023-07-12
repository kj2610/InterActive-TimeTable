const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    dept: {
        type: 'string',
        required: true
    },
    b_name: {
        type: 'string',
        required: true
    },
    sem: {
        type: 'string',
        required: true
    },
    year: {
        type: 'string',
        required: true
    }
})

const db = mongoose.model('faculty', schema)

module.exports = db