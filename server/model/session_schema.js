const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    year: {
        type: 'string',
        required: true
    }
})

const db = mongoose.model('session', schema)

module.exports = db