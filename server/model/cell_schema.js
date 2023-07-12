const mongoose = require('mongoose')

var schema = new mongoose.Schema({
    c_name: {
        type: 'string',
        required: true
    },
    t_name: {
        type: 'string',
        required: true
    },
    room_no: {
        type: 'string',
        required: true
    }
})

const db = mongoose.model('cell', schema)

module.exports = db