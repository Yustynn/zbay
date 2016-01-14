// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Review = mongoose.model('Review');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Category = mongoose.model('Category');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var registeredUserAgent;
var adminUserAgent;
var regUser;
var prod;
var userObj;
var cat;
var regRev;
var admRev;
var admUser;

describe('Reviews route for registered user', function () {

	beforeEach('Establish DB connection', function (done) {
		// console.log('zoom');
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	// afterEach('Clear test database', function (done) {
	// 	clearDB(done);
	// });


	describe('/api', function (done) {

		describe('reviews', function (done) {

			var review;

			beforeEach('create user',function(done){
				// console.log('fuck up some commas');
				userObj = [{
					name: 'Creed',
					email: '2pr0p3r4u@yahoo.com',
					password: 'edebdz',
					isAdmin: true
				},
				{
					name: 'meek mill',
					email: 'meek@mill.com',
					password: 'houseparty',
					isAdmin: false
				}
				]
				User.create(userObj).then(function(users){
					console.log('usama ',users);
					regUser = users[1];
					admUser = users[0];
					console.log('adam ',admUser);
					registeredUserAgent = supertest.agent(app);
	            	registeredUserAgent.post('/login').send(userObj[1]).end()		
				}).then(function(){
					done();
				})		
			});

			beforeEach('create category',function(done){
				// console.log('sldkfjlksdjfl');
				Category.create({
					name: 'hate'
				}).then(function(category){
					cat = category;
					// console.log('look at the flick o da wrist ',category)
					done();
				})
			})

			beforeEach('create product',function(done){
				// console.log('i hate tests');
				Product.create({
					title: 'shotgun',
					categories: [cat._id],
					description: 'the illest shotgun ever',
					photoUrls: ['trust me its sexy'],
					defaultPhotoUrl: 'trust me its sexy',
					reviews: [],
					stock: 1
				}).then(function(product){
					// console.log('product ',product)
					prod = product;
					done();
				})
			});


			beforeEach('create review',function(done){
				// console.log('i hate tests');
				var reviews = [{
					user: regUser._id,
					product: prod._id,
					text: 'i hate writing tests',
					starRating: 0
				},
				{
					user: admUser._id,
					product: prod._id,
					text: 'i am too admin to curse',
					starRating: 3
				}
				]
				Review.create(reviews).then(function(reviewarr){
					// console.log('review ',review)
					regRev = reviewarr[0];
					admRev = reviewarr[1];
					done();
				})
			});

			beforeEach('sign in user',function(done){
				registeredUserAgent = supertest.agent(app);
	            registeredUserAgent.post('/login').send(userObj[1]).end(done)
			})


			it('GET all', function (done) {
				registeredUserAgent
				.get('/api/reviews')
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body).to.be.instanceof(Array);
					expect(res.body).to.have.length(2);
					done();
				});
			});

			var createdReview;

			it('POST one', function (done) {
				registeredUserAgent
				.post('/api/reviews')
				.send({
					user: regUser._id,
					product: prod._id,
					text: 'i fucking hate crowded subways',
					starRating: 0
				})
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body.text).to.equal('i fucking hate crowded subways');
					createdReview = res.body;
					done();
				});
			});
			
			it('GET one', function (done) {
				// console.log('created ',createdReview);
				registeredUserAgent
				.get('/api/reviews/' + regRev._id)
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body.text).to.equal(rev.text);
					done();
				});
			});


			
			xit('can PUT update on its own post', function (done) {
				registeredUserAgent
				.put('/api/reviews/' + rev._id)
				.send({
					text: 'everybody on the road is an obstacle to me'
				})
				.expect(200)
				.end(function (err, res) {
					if (err) return done(err);
					expect(res.body.text).to.equal('everybody on the road is an obstacle to me');
					done();
				});
			});

			
			xit('DELETE one', function (done) {
				registeredUserAgent
				.delete('/api/reviews/' + rev._id)
				.expect(204)
				.end(function (err, res) {
					if (err) return done(err);
					Review.findById(rev._id, function (err, b) {
						if (err) return done(err);
						expect(b).to.be.null;
						done();
					});
				});
			});


		});

	

	});

	

});
