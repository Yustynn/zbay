var mongoose = require('mongoose');
var Promise = require('bluebird');
var SentEmailCollection = Promise.promisifyAll(mongoose.model('SentEmailCollection'));

/**
 * @type {array of emailCollection data for seeding}
 * the seed is used in indexConnect.js
 */
var emailCollections = [
  {
    complete: false,
    processing: true,
    shipped: true,
    delivered: false
  },
  {
    complete: true,
    processing: true,
    shipped: true,
    delivered: true
  },
  {
    complete: false,
    processing: false,
    shipped: false,
    delivered: false
  },
  {
    complete: true,
    processing: true,
    shipped: true,
    delivered: false
  },
  {
    complete: true,
    processing: true,
    shipped: true,
    delivered: false
  },
  {
    complete: true,
    processing: false,
    shipped: true,
    delivered: false
  },
  {
    complete: false,
    processing: true,
    shipped: true,
    delivered: false
  },
  {
    complete: true,
    processing: true,
    shipped: false,
    delivered: false
  },
  {
    complete: false,
    processing: true,
    shipped: false,
    delivered: false
  },
  {
    complete: false,
    processing: true,
    shipped: true,
    delivered: false
  }
];

var seedEmailCollections = function (collection) {
    return SentEmailCollection.createAsync(collection);
};

module.exports = {
  data : emailCollections,
  seedEmailCollections : seedEmailCollections
}

