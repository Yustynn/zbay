const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	complete: {type: Boolean, default: false},
	processing: {type: Boolean, default: false},
	shipped: {type: Boolean, default: false},
	delivered: {type: Boolean, default: false}
	});


mongoose.model('SentEmailCollection', schema);

