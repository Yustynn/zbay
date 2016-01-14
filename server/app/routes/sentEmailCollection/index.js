'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;

var SentEmailCollection = mongoose.model('SentEmailCollection')

router.get('/',function(req,res,next){
	SentEmailCollection.find()
	.then(emailCollection => res.json(emailCollection))
	.then(null,next);
});

router.get('/:id',function(req,res,next){
    console.log("Hit the getOne email route", req.params);
	SentEmailCollection.findById(req.params.id)
	.then(emailCollection => {
            res.json(emailCollection)
        })
	.then(null,next);
});

router.put('/:id',function(req,res,next){
	SentEmailCollection.findByIdAndUpdate(req.params.id, req.body, {new: true})
	.then(emailCollection => res.json(emailCollection))
	.then(null,next);
});

router.post('/',function(req,res,next) {
    SentEmailCollection.create(req.body)
        .then(emailCollection => res.status(201).json(emailCollection))
});

router.delete('/:id',function(req,res,next){
	SentEmailCollection.findByIdAndRemove(req.params.id)
	.then(emailCollection => res.json(emailCollection))
	.then(null,next)
});
