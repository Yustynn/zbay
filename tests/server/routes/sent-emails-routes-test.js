/**
 * Created by Jon on 1/13/16.
 */
/**
 * Created by Jon on 1/13/16.
 */
// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var SentEmailCollection = mongoose.model('SentEmailCollection');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('SentEmails Route', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('/', function() {

        var userAgent, emailCollection;
        var counter = 1;

        beforeEach('Create a user and generate email status', function (done) {
            User.create({
                email: 'someEmail@aol.com',
                password: 'thisisapassword',
                name: 'Bill Lee',
                isAdmin: false,
                shipping: {
                    line1: "This is line1"
                }
            }).then(user => {
                return SentEmailCollection.create({
                    user: user._id,
                    complete: false,
                    processing: true,
                    shipped: true,
                    delivered: false
                })
            }).then(email => {
                //console.log("email in .then; number ", counter++, email)
                emailCollection = email;
                done();
            }, done)
        });

        beforeEach('Create guest agent', function () {
            userAgent = supertest.agent(app);
        });

        it('responds with an array of all emails', function(done) {
            //console.log("Email id in first test", emailCollection._id)
            userAgent
                .get('/api/sentEmailCollection')
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

        it('responds with one email', function(done) {
            console.log("email id on second test", emailCollection._id)
            userAgent
                .get('/api/sentEmailCollection/' + emailCollection._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        expect(response.body._id).to.equal(emailCollection._id.toString())
                        done();
                    }
                })
        })

        it('updates an email', function(done) {
            userAgent
                .put('/api/sentEmailCollection/' + emailCollection._id)
                .send({complete: true})
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        expect(response.body._id).to.equal(emailCollection._id.toString());
                        expect(response.body.complete).to.be.true;
                        done();
                    }
                })
        })

        it('creates an email', function(done) {
            User.create({
                email: 'newEmail@aol.com',
                password: 'thisisapassword',
                name: 'William Lee',
                isAdmin: false,
                shipping: {
                    line1: "This is a new line1"
                }
            }).then(newUser => {
                userAgent
                    .post('/api/sentEmailCollection/')
                    .send({
                        user: newUser._id,
                        complete: true,
                        processing: true,
                        shipped: true,
                        delivered: true
                    })
                    .expect(201)
                    .expect('Content-Type', /json/)
                    .end(function(err, response) {
                        if (err) done(err)
                        else {
                            expect(response.body.user).to.equal(newUser._id.toString());
                            done();
                        }
                    })
            })


        })

        it('deletes an email', function(done) {
            userAgent
                .delete('/api/sentEmailCollection/' + emailCollection._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, response) {
                    if (err) done(err)
                    else {
                        expect(response.body._id).to.equal(emailCollection._id.toString());
                        expect(response.body.email).to.equal(emailCollection.email);
                        SentEmailCollection.findById(emailCollection._id).then(found => {
                            expect(found).to.be.null;
                            done();
                        })
                    }
                })
        })
    })


});
