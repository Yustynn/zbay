const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photoUrls: [String],
  defaultPhotoUrl: String,
  stock: {
    type: Number,
    default: 0
  },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Sets default photo to first photo when no default photo is specified
schema.pre('save', function (next) {
    if (!this.defaultPhotoUrl && this.photoUrls) {
      this.defaultPhotoUrl = this.photoUrls[0];
    }
    next();
});

mongoose.model('Product', schema);
