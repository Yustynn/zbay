var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var seedUsers = require('./seedUsers');
var seedProducts = require('./seedProducts');
var seedCategory = require('./seedCategory');
var seedAddress = require('./seedAddress');
var connectToDb = require('../server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));
var User = Promise.promisifyAll(mongoose.model('User'));
var Category = Promise.promisifyAll(mongoose.model('Category'));
var Address = Promise.promisifyAll(mongoose.model('Address'));


/**
 * First seed file to run
 * populates users, products, categories
 * The second file is indexConnect.js
 */

connectToDb.then(function () {

}).then(function() {
    var users = seedUsers();
    var products = seedProducts();
    var categories = seedCategory();
    var addresses = seedAddress();
    return Promise.all([users, products, categories, addresses])
      .then(function(results) {
        return results;
      })
})
.then(function () {
  console.log(chalk.green('Seed successful!'));
  process.kill(0);
}).catch(function (err) {
  console.error(err);
  process.kill(1);
});

