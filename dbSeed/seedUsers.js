var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('../server/db');
var User = Promise.promisifyAll(mongoose.model('User'));

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            name: 'John Doe',
            isAdmin: false
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            name: 'Jane Dae',
            isAdmin: true
        }
    ];

    return User.createAsync(users);

};

module.exports = seedUsers;
