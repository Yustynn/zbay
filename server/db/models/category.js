'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name : {
    type : String
  },
  products : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Product'
  }]
});

mongoose.model('Category', schema);
