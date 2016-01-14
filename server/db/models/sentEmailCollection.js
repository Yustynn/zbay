const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    processing: {
        type: Boolean,
        default: false
    },
    shipped: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    }
});


mongoose.model('SentEmailCollection', schema);
