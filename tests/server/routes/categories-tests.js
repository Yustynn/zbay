// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');

// Retrieve references to relevant models
var Category = mongoose.model('Category');
var User = mongoose.model('User');

var expect = require('chai').expect;
var supertest = require('supertest-as-promised');

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var app = require('../../../server/app');


describe('Categories Route', function() {
  // 10 categories
  let categoriesInfo = [{
    name: 'appliances'
  }, {
    name: 'apps and games'
  }, {
    name: 'automotives'
  }, {
    name: 'health and beauty'
  }, {
    name: 'electronics'
  }, {
    name: 'grocery and gourmet foods'
  }, {
    name: 'handmade'
  }, {
    name: 'personal care'
  }, {
    name: 'luxury beauty'
  }, {
    name: 'weapons'
  }];

  beforeEach('Establish DB connection', function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  beforeEach('Create categories', function(done) {
    Category.create(categoriesInfo, done);
  });

  afterEach('Clear test database', function(done) {
    clearDB(done);
  });

  describe('Guest user request', function() {

    var guestUserAgent;

    beforeEach('Create guest user agent', done => {
        guestUserAgent = supertest.agent(app);
        done();
    });

    describe('registered user can', () => {
      describe('read all categories', () => {
        it('should get with 200 response and with all categories', done => {
          guestUserAgent.get('/api/categories')
            .expect(200)
            .then(res => {
              expect(res.body.length).to.eql(10)
              done();
            })
        })
      })
    })

    describe('registered user cannot', () => {

      describe('add a category', () => {
        it('should get with 401 response', done => {
          let singleCategory = {
            name: 'luxury beauty'
          };

          return guestUserAgent.post('/api/categories', singleCategory)
            .expect(401)
            .then(() => done())
        })
      });

      describe('update a category', () => {
        it('should get with 401 response', done => {

          Category.findOne()
            .then(category => {
              guestUserAgent.put('/api/categories/' + category._id)
                .send({
                  name: 'Updated Category'
                })
                .expect(401)
                .then(() => done())
            })
        })
      });

      describe('delete a category', () => {
        it('should get with 401 response', done => {
          Category.findOne()
            .then(category => {
              guestUserAgent.delete('/api/categories/' + category._id)
                .expect(401)
                .then(() => done())
            })
        })
      })

    })
  });

  describe('Registered user request', function() {

    var registeredUserAgent;

    beforeEach('Create registered user agent and authenticate', done => {
      let registeredUserInfo = {
        email: 'testing@fsa.com',
        password: 'password',
        name: 'John Doe',
        isAdmin: false
      };

      return User.create(registeredUserInfo)
        .then(user => {
          registeredUserAgent = supertest.agent(app);
          registeredUserAgent.post('/login').send(registeredUserInfo).end(done);
        })
    });

    describe('registered user can', () => {
      describe('read all categories', () => {
        it('should get with 200 response and with all categories', done => {
          registeredUserAgent.get('/api/categories')
            .expect(200)
            .then(res => {
              expect(res.body.length).to.eql(10)
              done();
            })
        })
      })
    })

    describe('registered user cannot', () => {

      describe('add a category', () => {
        it('should get with 401 response', done => {
          let singleCategory = {
            name: 'luxury beauty'
          };

          return registeredUserAgent.post('/api/categories', singleCategory)
            .expect(401)
            .then(() => done())
        })
      });

      describe('update a category', () => {
        it('should get with 401 response', done => {

          Category.findOne()
            .then(category => {
              registeredUserAgent.put('/api/categories/' + category._id)
                .send({
                  name: 'Updated Category'
                })
                .expect(401)
                .then(() => done())
            })
        })
      });

      describe('delete a category', () => {
        it('should get with 401 response', done => {
          Category.findOne()
            .then(category => {
              registeredUserAgent.delete('/api/categories/' + category._id)
                .expect(401)
                .then(() => done())
            })
        })
      })

    })
  });

  describe('Admin user', function() {

    var adminUserAgent;

    beforeEach('Create admin user agent and authenticate', done => {
      let adminUserInfo = {
        email: 'testing@fsa.com',
        password: 'password',
        name: 'Doe Doe',
        isAdmin: true
      };

      return User.create(adminUserInfo)
        .then(user => {
          adminUserAgent = supertest.agent(app);
          adminUserAgent.post('/login').send(adminUserInfo).end(done);
        })
    });

    describe('should be able to', () => {
      describe('read all categories', () => {
        it('should get with 200 response and with all categories', done => {
          adminUserAgent.get('/api/categories')
            .expect(200)
            .then(res => {
              expect(res.body.length).to.eql(10)
              done();
            })
        })
      })

      describe('add a category', () => {
        it('should get with 401 response', done => {
          let singleCategory = {
            name: 'luxury beauty'
          };

          adminUserAgent.post('/api/categories')
            .send(singleCategory)
            .expect(201)
            .then(() => done())
        })
      });

      describe('update a category', () => {
        it('should get with 204 response', done => {

          Category.findOne()
            .then(category => {
              adminUserAgent.put('/api/categories/' + category._id)
                .send({
                  name: 'Updated Category'
                })
                .expect(200)
                .then(() => done())
            })
        })

        it('should have updated the category', done => {

          Category.findOne()
            .then(category => {
              adminUserAgent.put('/api/categories/' + category._id)
                .send({
                  name: 'Updated Category'
                })
                .then(res => res.body)
                .then(updatedCategory => {
                  expect(updatedCategory.name).to.be.equal('Updated Category');
                  done();
                })
            })
        })
      });

      describe('delete a category', () => {
        it('should get with 200 response', done => {
          Category.findOne()
            .then(category => {
              adminUserAgent.delete('/api/categories/' + category._id)
                .expect(200)
                .then(() => done())
            })
        })

        it('should delete the category', done => {
          Category.findOne()
            .then(category => {
              return adminUserAgent.delete('/api/categories/' + category._id)
            })
            .then(deletedCategory => Category.findById(deletedCategory._id))
            .then(foundCategory => {
              expect(foundCategory).to.be.null;
              done()
            })
        })
      })
    })
  })

});
