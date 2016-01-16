require('../server/db/models')
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
      description: "This ain't your father's crowbar. Smash some heads in!",
      photoUrls: ['http://vignette4.wikia.nocookie.net/half-life/images/e/ef/Gordon_crowbar_enemies.jpg/revision/latest?cb=20090103234048&path-prefix=en'],
      stock: 5
    },
    {
      title: "'The Pacifier' Baseball Bat",
      description: "Trying to go to sleep, but zombies keeping you up at night? Give 'em something to suck on.",
      photoUrls: ['http://previews.123rf.com/images/Elnur/Elnur1404/Elnur140401189/27553277-Violent-man-with-baseball-bat-on-white-Stock-Photo.jpg'],
      stock: 22
    },
    {
      title: "The Walking Dead",
      description: "Makeup to make you look like a zombie. Just don't break character (walk like the dead)",
      photoUrls: ['http://www.ew.com/sites/default/files/styles/tout_image_612x380/public/i/2015/04/13/darren-criss.jpg?itok=3lXx0Pm-'],
      stock: 2
    },
    {
      title: "Perfume",
      description: "Smell good while killing zombies. They'll thank you for it.",
      photoUrls: ['http://cdni.wired.co.uk/1920x1280/s_v/smell.jpg'],
      stock: 5999
    }
  ]

  return Product.createAsync(products);
};

module.exports = seedProducts;
