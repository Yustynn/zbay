'use strict';
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  }
});

mongoose.model('Category', schema);
