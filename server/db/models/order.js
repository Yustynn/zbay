'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  orderItems : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'OrderItem',
    required : true
  }],
  datetime : {
    type : Date,
    default : Date.now
  },
  status : {
    type : String,
    enum : [ 'inCart', 'processing', 'shipped', 'delivered'],
    default : 'inCart'
  },
  emailStatus : {
    type: String,
    enum: ['processing', 'shipped', 'delivered'],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  address : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }
});

mongoose.model('Order', schema);
