var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');

//drop dbs in mongo shell db.runCommand({dropDatabase : 1})
var connectToDb = require('../server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));
var User = Promise.promisifyAll(mongoose.model('User'));
var Category = Promise.promisifyAll(mongoose.model('Category'));
var Review = Promise.promisifyAll(mongoose.model('Review'));
var Order = Promise.promisifyAll(mongoose.model('Order'));
var OrderItem = Promise.promisifyAll(mongoose.model('OrderItem'));
var Address = Promise.promisifyAll(mongoose.model('Address'));

/**
 * exported an array of seed data that was added with additional data
 * before it was then pushed into the collections
 */
var reviewData = require('./seedReviews').data;

/**
 * Helper function
 * @param arr
 * @returns {a random value from that array}
 */
var getRandomFromArray = function (arr) {
  var res = arr[Math.floor(Math.random() * arr.length)];
  return res;
};

/**
 * Helper function
 * @param number
 * @returns {random number}
 */
var generateRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
}
/**
 * Helper function
 * @param arr
 * @returns {Array of random values}
 * to keep values unique, if the results array contains a value,
 * the function will not push the value into the array
 */
var generateArrayOfValues = function (arr) {
  var count = generateRandomNumber(arr.length);
  var results = [];
  for (var i = 0; i < count; i++) {
    var generated = getRandomFromArray(arr);
    if (results.indexOf(generated) === -1){
      results.push(generated);
    }
  }
  return results;
};

/**
 * The bulk of the seeding occurs here
 */
var products;
var categories;
var users;
var addresses;

connectToDb
  .then(function(){
    return Category.findAsync({})
  })
  .then(function(allCategories) {
    categories = allCategories;
  })
  .then(function(){
    return Product.findAsync({})
  })
  .then(function(allProducts) {
    products = allProducts
  })
  .then(function() {
    return User.findAsync({});
  })
  .then(function(allUsers) {
    users = allUsers;
  })
  .then(function() {
    return Address.findAsync({});
  })
  .then(function(alladdresses) {
    addresses = alladdresses;
  })
  .then(function () {
    // attaching addresses to users

  })
  .then(function() {
    // attaching product and user to a review and populate the Review
    // reviewData is included at top of the file
    reviewData.forEach(function(review) {
      review.product = getRandomFromArray(products)._id;
      review.user = getRandomFromArray(users)._id;
    });
    return Review.createAsync(reviewData);
  })
  .then(function() {
    // attaching categories and stock numbers with a product
    return Promise.all(products.map(function(product) {
      var randomCategories = generateArrayOfValues(categories);
      if (randomCategories.length > 2) {
        randomCategories = randomCategories.slice(0,2);
      }
      product.categories = randomCategories;
      product.stock = generateRandomNumber(100);
      return product.save();
    }));
  })
  .then(function () {
    for (var i = 0; i < 5; i++) {
      var items = [];
      for (var j = 0; j < 5; j++) {
        var orderItem = new OrderItem({
          product : getRandomFromArray(products),
          quantity :generateRandomNumber(50)
        });
        items.push(orderItem);
      }

      var order = new Order({
        user : getRandomFromArray(users),
        orderItems : items
      });
      order.save();
    }
  })
  .then(function () {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  }).catch(function (err) {
    console.error(err);
    process.kill(1);
  });

//.then(function(products) {
//  Promise.all(products).then(function(product){
//    console.log(product);
//  })
//})
