'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  product : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Product',
    required : true
  },
  quantity : {
    type : Number,
    default : 1,
    required : true
  }
});

mongoose.model('OrderItem', schema);
