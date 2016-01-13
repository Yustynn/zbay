
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Review = Promise.promisifyAll(mongoose.model('Review'));

var seedReviews = function () {

    var reviews = [
        {
            user: //will put this in later,
            product: //will put this in later,
            text: 'i died trying to use this product so this my ghost typing up this crappy review',
            starRating: 0
        },
        {
            user: //will put this in later,
            product: //will put this in later,
            text: 'why TF would they charge me 15 bucks for this?? never again',
            starRating: 0
        },
        {
            user: //will put this in later,
            product: //will put this in later,
            text: 'i hated it',
            starRating: 0
        },
        {
            user: //will put this in later,
            product: //will put this in later,
            text: 'this shotgun cant take a foam target.. zombie ate my brains and now i, too, am zombie',
            starRating: 1
        },
        {
            user: //will put this in later,
            product: //will put this in later,
            text: 'its water.. why did i have to pay for this??',
            starRating: 1
        },
        {
            user: //will put this in later,
            product: //will put this in later,
            text: 'im blind now bc of this stupid flashlight',
            starRating: 0
        },
        {
            user: //will put this in later,
            product: //will put this in later,
            text: 'I FRIGGIN LOVE TWINKIES!!!',
            starRating: 5
        },
        {
            user: //will put this in later,
            product: //will put this in later,
            text: 'it did the job',
            starRating: 3
        },
        {
            user: //will put this in later,
            product: //will put this in later,
            text: 'too many array methods confusing AF',
            starRating: 1
        },
        {
            user: //will put this in later,
            product: //will put this in later,
            text: 'couldnt stop eating.. everything was funny and amazinggggg',
            starRating: 5
        },

    ];

    return Review.createAsync(reviews);

};

connectToDb.then(function () {
    Review.findAsync({}).then(function (reviews) {
        if (reviews.length === 0) {
            return seedReviews();
        } else {
            console.log(chalk.magenta('We already have seeded reviews'));
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
