const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    sem: {
        type: 'string',
        required: true
    }
})

const db = mongoose.model('semester', schema)

module.exports = db