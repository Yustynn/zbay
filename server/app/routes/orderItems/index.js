'use strict';
let router = require('express').Router();
module.exports = router;
let _ = require('lodash');
let mongoose = require('mongoose');
let OrderItem = mongoose.model('OrderItem');

router.post('/', (req, res, next) => {
  OrderItem.create(req.body).exec()
    .then( orderItem => orderItem )
    .then( null, next);
});

router.get('/', (req, res, next) => {
  OrderItem.findOne(req.body).exec()
    .then( orderItem => res.json(orderItem))
    .then( null, next);
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  OrderItem.findOne({_id : id }).exec()
    .then( orderItem => res.json(orderItem))
    .then( null, next);
});

// have to know which id to update
// is there a case to update all orderItems
router.put('/:id', (req, res, next) => {
  let id = req.params.id;
  OrderItem.findOneAndUpdate({ _id : id }, req.body)
    .then(orderItem => res.json(orderItem))
    .then(null, next);
});

// unsure if this is needed
// just a general delete of either product or quantity
router.delete('/', (req, res, next) => {
  OrderItem.remove(req.body).exec()
    .then( orderItem => res.json(orderItem))
    .then( null, next);
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  OrderItem.remove({_id : id }).exec()
    .then( orderItem => res.json(orderItem))
    .then( null, next);
});
