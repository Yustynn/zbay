'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;

var SentEmailCollection = mongoose.model('SentEmailCollection')


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/',function(req,res,next){
	SentEmailCollection.find({})
	.then(emailCollections => res.json(emailCollection))
	.then(null,next);
});

router.get('/:id',function(req,res,next){
	SentEmailCollectionById.find(req.params.id)
	.then(emailCollection => res.json(emailCollection))
	.then(null,next);
});

router.put('/:id',function(req,res,next){
	SentEmailCollection.findByIdAndUpdate(req.params.id, req.body, {new: true})
	.then(emailCollection => res.json(emailCollection))
	.then(null,next);
});


router.post('/:id',function(req,res,next){
	SentEmailCollection.create({
		complete: req.body.complete,
		processing: req.body.processing,
		shipped: req.body.shipped,
		delivered: req.body.delivered
	})
	.then(emailCollection => res.json(emailCollection))
	.then(null,next)
});

router.delete('/:id',function(req,res,next){
	SentEmailCollection.findByIdAndRemove(req.params.id)
	.then(emailCollection => res.redirect(''))
	.then(null,next)	
});