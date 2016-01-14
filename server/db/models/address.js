/**
 * Created by Jon on 1/14/16.
 */
'use strict';
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const addressModel = {
    line1: String,
    line2 : String,
    zip : String,
    city : String,
    state : String
};

const addressSchema = new Schema({
    billingAddress: addressModel,
    shippingAddress: addressModel
});

mongoose.model('Address', addressSchema);
