'use strict';
let router = require('express').Router();
module.exports = router;
let _ = require('lodash');
let mongoose = require('mongoose');
let Category = mongoose.model('Category');
let isAdmin = false;

/**
 *  Admin  has access to all CRUD operations
 *  all users, including unregistered users can read categories
 *
 */

router.post('/', (req, res, next) => {
  if (!isAdmin) return res.send(401).end();
  Category.create(req.body).exec()
    .then( category => res.json(category))
    .then( null, next );
});

// all users can read categories
router.get('/', (req, res, next) => {
  Category.find({}).exec()
    .then( categories => res.json(categories))
    .then( null, next );

});

// again, is there a need to update a category?
// you just add a category and delete a category
router.put('/', (req, res, next) => {
  if (!isAdmin) return res.send(401).end();
  Category.findOneAndUpdate(req.body).exec()
    .then( category => res.json(category))
    .then( null, next);
});

router.delete('/', (req, res, next) => {
  if (!isAdmin) return res.send(401).end();
  Category.remove(req.body).exec()
    .then( category => res.json(category))
    .then( null, next);
});
