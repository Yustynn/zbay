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
      price : 34,
      description: "This ain't your father's crowbar. Smash some heads in!",
      photoUrls: ["http://vignette3.wikia.nocookie.net/half-life/images/6/6f/Crowbar_world_model_ep2.jpg/revision/latest?cb=20090527021758&path-prefix=en"],
      defaultPhotoUrl: "http://vignette3.wikia.nocookie.net/half-life/images/6/6f/Crowbar_world_model_ep2.jpg/revision/latest?cb=20090527021758&path-prefix=en",
    },
    {
      title: "'The Pacifier' Baseball Bat",
      price : 49.99,
      description: "Trying to go to sleep, but zombies keeping you up at night? Give 'em something to suck on.'",
      photoUrls: ["http://muskegostormbaseball.org/wp-content/uploads/baseball.jpg"],
      defaultPhotoUrl: "http://leanblitzconsulting.com/wp-content/uploads/2011/12/baseball-bat.jpg",
    },
    {
      title: "The Walking Dead",
      price : 20,
      description: "Makeup to make you look like a zombie. Just don't break character (walk like the dead)",
      photoUrls: ["http://makeup.school/wp-content/uploads/Pro_Makeup_Kit1.jpg","http://www.zombies.ws/wp-content/uploads/2011/10/51mQ+WkMW1L._SL500_AA300_.jpg"],
      defaultPhotoUrl: "http://www.zombies.ws/wp-content/uploads/2011/10/51mQ+WkMW1L._SL500_AA300_.jpg"
    },
    {
      title: "Perfume",
      price : 10,
      description: "Smell good while killing zombies. They'll thank you for it.",
      photoUrls: ["http://www.birdswelcome.com/wp-content/uploads/2015/11/Perfume.jpg","http://i.huffpost.com/gen/1131377/images/o-PERFUME-facebook.jpg"],
      defaultPhotoUrl: "http://i.huffpost.com/gen/1131377/images/o-PERFUME-facebook.jpg"
    }
  ]

  return Product.createAsync(products);
};

module.exports = seedProducts;
