const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    dept: {
        type: 'string',
        required: true
    }
})

const db = mongoose.model('department', schema)

module.exports = db