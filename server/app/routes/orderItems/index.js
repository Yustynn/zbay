'use strict';
const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');
let OrderItem = mongoose.model('OrderItem');

router.post('/', (req, res, next) => {
  OrderItem.create(req.body)
    .then( orderItem => orderItem )
    .then( null, next );
});

router.get('/', (req, res, next) => {
  OrderItem.findOne(req.body)
    .then( orderItem => res.json(orderItem) )
    .then( null, next );
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  OrderItem.findById(id)
    .then( orderItem => res.json(orderItem) )
    .then( null, next );
});

router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  OrderItem.findByIdAndUpdate(id, req.body)
    .then(orderItem => res.json(orderItem) )
    .then(null, next );
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  OrderItem.findByIdAndRemove(id)
    .then( orderItem => res.json(orderItem) )
    .then( null, next );
});
