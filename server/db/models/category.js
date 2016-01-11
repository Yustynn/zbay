'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name : {
    type : String
  },
  products : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Product'
  }]
});

mongoose.model('Category', schema);
