const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    b_name: {
        type: 'string',
        required: true
    }
})

const db = mongoose.model('branch', schema)

module.exports = db