'use strict';
let router = require('express').Router();
module.exports = router;
let _ = require('lodash');
let mongoose = require('mongoose');
let Order = mongoose.model('Order');
// this is a placeholder to check if user
let isAdmin = false;

/**
 * CRUD operations
 * Admin gets all orders for CRUD
 * Registered users can access CRUD for individual Orders
 */

/**
 *  These CRUD operations should be accessible by both admin and individual users
 *  TODO : Need to check that the user is the individual user with that order
 */
router.post('/', (req, res, next) => {
  Order.create(req.body).exec()
    .then( order => res.json(order))
    .then( null, next );
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Order.findOne(id).exec()
    .then( order => res.json(order))
    .then( null, next );
});

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  Order.findByIdAndUpdate(id, req.body, {new : true}).exec()
    .then( order => res.json(order))
    .then( null , next);
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  Order.remove({ _id : id }).exec()
    .then( order => res.json(order))
    .then( null, next);
});

/**
 *  These / CRUD can only be accessed if you are admin
 *  otherwise should send a 401 user unauthorized
 */
router.post('/', (req, res, next) => {
  if (!isAdmin) return res.send(401).end();
  Order.create(req.body).exec()
    .then( order => res.json(order))
    .then( null, next);
});

/**
 *  This will return all orders
 *  To find individual orders can do this
 *  model.find({'_id' : {$in : [id1, id2, id3, ...]}})
 */
router.get('/', (req, res, next) => {
  if (!isAdmin) return res.send(401).end();
  Order.find({}).exec()
    .then( orders => res.json(orders))
    .then( null, next);
});

router.put('/', (req, res, next) => {
  if (!isAdmin) return res.send(401).end();
  Order.find({}).exec()
    // what is a better way of updating each order
    // what is use case for this?
    .then(orders => {
      orders.forEach(order => {
        order.update(req.body);
      })
    })
    .then( null, next);
});

// what is the use case. Admin has this power, but is it needed for
// scope of this project?
router.delete('/', (req, res, next) => {
  if (!isAdmin) return res.send(401).end();
  Order.remove({}).exec()
    .then( orders => res.json(orders))
    .then( null, next);
});


