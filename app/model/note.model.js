const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    customer_id: Number,
    store_id: Number,
    first_name: String,
    last_name: String,
    email: String,
    address_id : Number,
    active: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);