/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have products
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));

function seedProducts() {
  var products = [{
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
  }]

  return Product.createAsync(products);
}

connectToDb.then(function () {
    Product.findAsync({}).then(function (products) {
        if (products.length === 0) {
            return seedProducts();
        } else {
            console.log(chalk.magenta('Seems to already be product data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
