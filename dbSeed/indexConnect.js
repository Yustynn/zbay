var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
// there are a couple more seed files to be put in
var connectToDb = require('../server/db');
var Product = Promise.promisifyAll(mongoose.model('Product'));
var User = Promise.promisifyAll(mongoose.model('User'));
var Category = Promise.promisifyAll(mongoose.model('Category'));
var Review = Promise.promisifyAll(mongoose.model('Review'));
var Order = Promise.promisifyAll(mongoose.model('Order'));
var OrderItem = Promise.promisifyAll(mongoose.model('OrderItem'));
var SentEmailCollection = Promise.promisifyAll(mongoose.model('SentEmailCollection'));
var reviewData = require('./seedReviews').data;
var emailCollectionData = require('./seedEmailColl').data;


//drop dbs in mongo shell db.runCommand({dropDatabase : 1})

var getRandomFromArray = function (arr) {
  var res = arr[Math.floor(Math.random() * arr.length)];
  return res;
};

var generateRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
}
// TODO : there are duplicate generation - will worry after seed works
// make unique if you can
var generateArrayOfValues = function (arr) {
  var count = generateRandomNumber(arr.length);
  var results = [];
  for (var i = 0; i < count; i++) {
    results.push(getRandomFromArray(arr));
  }
  return results;
};

connectToDb.then(function () {
    var products;
    var categories;
    var users;

    Category.findAsync({})
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
        // attaching product and user to a review and pop the Review
        reviewData.forEach(function(review) {
          review.product = getRandomFromArray(products)._id;
          review.user = getRandomFromArray(users)._id;
          console.log(review);
        });
        return Review.createAsync(reviewData);
      })
      .then(function() {
        emailCollectionData.forEach(function(email) {
          // Assumption that email collection data
          // means that this particular user has made an order
          email.user = getRandomFromArray(products)._id;
        });
        return SentEmailCollection.createAsync(emailCollectionData);
      })
      .then(function(sentEmailCollection) {
        // WORKING IN PROGRESS
        sentEmailCollection.forEach(function(email) {
          var orderItem = new OrderItem({
            product : getRandomFromArray(products)._id,
            quantity : generateRandomNumber(100)
          });

          var order = new Order({
            user : email.user,
            orderItem : [orderItem],
            sentEmails : email
          });

          orderItem.save();
          order.save();
        });
      })
      .then(function() {
          return Promise.all(products.map(function(product) {
            var randomCategories = generateArrayOfValues(categories);
            product.categories = randomCategories;
            product.stock = generateRandomNumber(100);
            return product.save();
          }));
      })
      .then(function(products) {
        Promise.all(products).then(function(product){
          //console.log(product);
        })
      })
      .then(function () {
          console.log(chalk.green('Seed successful!'));
          process.kill(0);
      }).catch(function (err) {
          console.error(err);
          process.kill(1);
      });
});
