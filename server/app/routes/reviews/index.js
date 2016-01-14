'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;

var Review = mongoose.model('Review');

router.get('/',function(req,res,next){
	console.log(req.body);
	Review.find({})
	.then(reviews => res.json(reviews))
	.then(null,next)
});

router.post('/',function(req,res,next){
	// console.log('we all up in this ROUTE');
	Review.create({
		user: req.body.user,
		product: req.body.product,
		text: req.body.text,
		starRating: req.body.starRating
	})
	.then(review => res.json(review))
	.then(null,next)

});

router.get('/:id',function(req,res,next){
	Review.findById(req.params.id)
	.then(function(review){
		// review = review[0];
		console.log('dat rev doe ',review);
		res.json(review);
	}).then(null,next)

});

router.put('/:id',function(req,res,next){
	Review.findByIdAndUpdate(req.params.id, req.body, {new: true})
	.then(review => res.json(review))
	.then(null,next)
});

router.delete('/:id',function(req,res,next){
	Review.findByIdAndRemove(req.params.id)
	.then(function(rev){
		Review.find({}).then(function(revs){
			res.status(204).send('moo');
		})
	})
});
