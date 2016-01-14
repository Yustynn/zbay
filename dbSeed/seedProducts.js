var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var Product = Promise.promisifyAll(mongoose.model('Product'));

/**
 *
 * @returns {array of product seeds for use}
 * exported for use in the seed file ./indexConnect.js
 */
var seedProducts = function() {
  var products = [
    {
      title: "'The Hook' Crowbar",
      description: "This ain't your father's crowbar. Smash some heads in!"
    },
    {
      title: "'The Pacifier' Baseball Bat",
      description: "Trying to go to sleep, but zombies keeping you up at night? Give 'em something to suck on.'"
    },
    {
      title: "The Walking Dead",
      description: "Makeup to make you look like a zombie. Just don't break character (walk like the dead)"
    },
    {
      title: "Perfume",
      description: "Smell good while killing zombies. They'll thank you for it."
    }
  ]

  return Product.createAsync(products);
};

module.exports = seedProducts;
