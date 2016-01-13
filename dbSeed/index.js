var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var seedUsers = require('./seedUsers');
var seedProducts = require('./seedProducts');
var seedCategory = require('./seedCategory');
// there are a couple more seed files to be put in
var connectToDb = require('../server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));
var User = Promise.promisifyAll(mongoose.model('User'));
var Category = Promise.promisifyAll(mongoose.model('Category'));

//drop dbs in mongo shell db.runCommand({dropDatabase : 1})

/**
 * TODO : randomly generate x number of categories for every product
 * TODO : add a stock
 */

connectToDb.then(function () {

}).then(function() {
    var users = seedUsers();
    var products = seedProducts();
    var categories = seedCategory();
    return Promise.all([users, products, categories])
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

