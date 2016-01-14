'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  orderItem : [{
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
    enum : ['processed', 'shipped', 'delivered'],
    default : 'processed'
  },
  sentEmails : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'SentEmailCollection'
  }
});

mongoose.model('Order', schema);
