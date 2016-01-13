'use strict';
const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');
const Category = mongoose.model('Category');
let isAdmin = false;

/**
 *  Admin  has access to all CRUD operations
 *  all users, including unregistered users can read categories
 *
 */

router.post('/', (req, res, next) => {
  if (!isAdmin) return res.send(401).end();
  Category.create(req.body)
    .then( category => res.json(category) )
    .then( null, next );
});

// all users can read categories
router.get('/', (req, res, next) => {
  Category.find()
    .then( categories => res.json(categories) )
    .then( null, next );

});

router.put('/:id', (req, res, next) => {
  if (!isAdmin) return res.send(401).end();
  Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then( category => res.json(category) )
    .then( null, next );
});

router.delete('/:id', (req, res, next) => {
  if (!isAdmin) return res.send(401).end();
  Category.findByIdAndRemove(req.params.id)
    .then( category => res.json(category) )
    .then( null, next );
});
