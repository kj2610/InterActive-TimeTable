const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    t_name: {
        type: 'string',
        required: true
    }
})

const db = mongoose.model('teacher', schema)

module.exports = db