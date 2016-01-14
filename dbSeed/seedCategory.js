var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('../server/db');
var Category = Promise.promisifyAll(mongoose.model('Category'));

/**
 * @returns {seedCategories function}
 * used in ./index.js to seed Categories in mongo
 */
var seedCategories =  function() {
  var categories =   [
    {name : 'appliances'},
    {name : 'apps and games'},
    {name : 'automotives'},
    {name : 'health and beauty'},
    {name : 'electronics'},
    {name : 'grocery and gourmet foods'},
    {name : 'handmade'},
    {name : 'personal care'},
    {name : 'luxury beauty'},
    {name : 'weapons'},
    {name : 'supplies'},
    {name : 'books'},
    {name : 'outdoor'},
    {name : 'shoes'}
  ];

  return Category.createAsync(categories);
}

connectToDb.then(function () {
  Category.findAsync({}).then(function (categories) {
    if (categories.length === 0) {
      return seedCategories();
    } else {
      console.log(chalk.magenta('Seems to already be category data, exiting!'));
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

module.exports = seedCategories;

