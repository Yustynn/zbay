var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('../server/db');
var Address = Promise.promisifyAll(mongoose.model('Address'));

/**
 * @returns {seedCategories function}
 * used in ./index.js to seed Categories in mongo
 */
var seedAddress =  function() {
  var addresses =   [
    {
      billingAddress : {
        line1 : '123 Fake street',
        line2 : '',
        zip : '12345',
        city : 'NY',
        State : 'NY'
      },
      shipingAddress : {
        line1 : '5 Hanover Square',
        line2 : '',
        zip : '10004',
        city : 'NY',
        state : 'NY'
      }
    },
    {
      billingAddress : {
        line : '123 Sesame Street',
        line2 : '',
        zip : '12345',
        city : 'Langhorne',
        state : 'PA'
      },
      shipingAddress : {
        line : '221B Baker Street',
        line2 : '',
        zip : '12345',
        city : 'NY',
        state : 'NY'
      }
    }
  ];

  return Address.createAsync(addresses);
};

module.exports = seedAddress;
