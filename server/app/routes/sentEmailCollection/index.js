'use strict';

var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var bodyParser = require('body-parser');
var SentEmailCollection = require('../../db/sentEmailCollection.js');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/',function(req,res,next){
	SentEmailCollection.find({})
	.then(emailCollections => res.send(emailCollection))
	.then(null,next);
});

router.get('/:emailCollection',function(req,res,next){
	SentEmailCollection.find({_id: req.params.emailCollection})
	.then(emailCollection => res.send(emailCollection))
	.then(null,next);
});

router.put('/:emailCollectionId',function(req,res,next){
	SentEmailCollection.findByIdAndUpdate(req.params.userId, req.body, {new: true})
	.then(emailCollection => res.send(emailCollection))
	.then(null,next);
});


router.post('/:emailCollection',function(req,res,next){
	SentEmailCollection.create({
		complete: req.body.complete,
		processing: req.body.processing,
		shipped: req.body.shipped,
		delivered: req.body.delivered
	}).then(emailCollection => res.send(emailCollection))
	.then(null,next)
});

router.delete('/:emailCollection',function(req,res,next){
	User.find({_id: req.params.emailCollection})
	.then(emailCollection => emailCollection.remove()
	.then(res.redirect('')))
	.then(null,next);
});