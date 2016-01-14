'use strict';
const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');
const Category = mongoose.model('Category');

var mustBeAdmin = function(req, res, next) {
  if (req.user && req.user.isAdmin) next();
  else res.status(401).end();
}

/**
 *  Admin  has access to all CRUD operations
 *  all users, including unregistered users can read categories
 *
 */

router.post('/', mustBeAdmin, (req, res, next) => {
  Category.create(req.body)
    .then( category => res.status(201).json(category) )
    .then( null, next );
});

// all users can read categories
router.get('/', (req, res, next) => {
  Category.find()
    .then( categories => res.json(categories) )
    .then( null, next );

});

router.put('/:id', mustBeAdmin, (req, res, next) => {
  Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then( category => res.status(200).json(category) )
    .then( null, next );
});

router.delete('/:id', mustBeAdmin, (req, res, next) => {
  Category.findByIdAndRemove(req.params.id)
    .then( category => res.json(category) )
    .then( null, next );
});
