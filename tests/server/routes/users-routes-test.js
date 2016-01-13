/**
 * Created by Jon on 1/13/16.
 */
// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Users Route', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('/', function() {

        var userAgent, newUser;

        beforeEach('Create a user', function (done) {
            User.create({
                    email: 'thisEmail@gmail.com',
                    password: 'password',
                    name: 'John Doe',
                    isAdmin: false,
                    shipping: {
                        line1: "This is line1"
                    }
                }).then(user => {
                //console.log("This is the user from DB", user);
                newUser = user;
                //console.log("new user", newUser)
                done();
            })
        });

        beforeEach('Create guest agent', function () {
            userAgent = supertest.agent(app);
        });

        it('responds with an array of all users', function(done) {
            userAgent
                .get('/api/users')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        expect(response.body).to.be.an('array');
                        expect(response.body).to.have.length(1);
                        done();
                    }
                })
        })

        it('responds with one user', function(done) {
            userAgent
                .get('/api/users/' + newUser._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        //expect(response.body).to.be.an('object');
                        //expect(response.body).to.have.length(1);
                        expect(response.body._id).to.equal(newUser._id.toString())
                        done();
                    }
                })
        })

        it('updates a user`', function(done) {
            userAgent
                .put('/api/users/' + newUser._id)
                .send({name: 'newName'})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        //expect(response.body).to.be.an('object');
                        //expect(response.body).to.have.length(1);
                        expect(response.body._id).to.equal(newUser._id.toString());
                        expect(response.body.name).to.equal("newName");
                        done();
                    }
                })
        })

        it('updates a user`', function(done) {
            userAgent
                .put('/api/users/' + newUser._id)
                .send({name: 'newName'})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        //expect(response.body).to.be.an('object');
                        //expect(response.body).to.have.length(1);
                        expect(response.body._id).to.equal(newUser._id.toString());
                        expect(response.body.name).to.equal("newName");
                        done();
                    }
                })
        })
    })


});
