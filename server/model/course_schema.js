const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    id: {
        type: 'string',
        required: true
    },
    c_name: {
        type: 'string',
        required: true
    }
})

const db = mongoose.model('course', schema)

module.exports = db