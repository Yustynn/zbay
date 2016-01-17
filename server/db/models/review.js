const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true
	},
	text: {
		type: String,
		required: true
	},
	starRating: {
		type: Number,
		required: true
	}
});


mongoose.model('Review', schema);
