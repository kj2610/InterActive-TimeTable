const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    room_no: {
        type: 'string',
        required: true
    }
})

const db = mongoose.model('room', schema)

module.exports = db