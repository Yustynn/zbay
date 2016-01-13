
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('../server/db');
var SentEmailCollection = Promise.promisifyAll(mongoose.model('SentEmailCollection'));

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
  data : emailCollections
}


//connectToDb.then(function () {
//    SentEmailCollection.findAsync({}).then(function (emailCollections) {
//        if (emailCollections.length === 0) {
//            return seedEmailCollections();
//        } else {
//            console.log(chalk.magenta('We already have seeded email collects'));
//            process.kill(0);
//        }
//    }).then(function () {
//        console.log(chalk.green('Seed successful!'));
//        process.kill(0);
//    }).catch(function (err) {
//        console.error(err);
//        process.kill(1);
//    });
//});
