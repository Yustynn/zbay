/**
 * Created by Jon on 1/14/16.
 */
'use strict';
const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');
const Address = mongoose.model('Address');

router.post('/', (req, res, next) => {
    Address.create(req.body)
        .then( address => res.status(201).json(address) )
        .then( null, next );
});

router.get('/', (req, res, next) => {
    Address.find()
        .then( address => res.json(address) )
        .then( null, next );

});

router.put('/:id', (req, res, next) => {
    Address.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then( address => res.status(200).json(address) )
        .then( null, next );
});

router.delete('/:id', (req, res, next) => {
    Address.findByIdAndRemove(req.params.id)
        .then( address => res.json(address) )
        .then( null, next );
});
