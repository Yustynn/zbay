'use strict';

var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var bodyParser = require('body-parser');
var Review = require('../../db/review.js');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/',function(req,res,next){
	Review.find({})
	.then(reviews => res.send(reviews))
	.then(null,next)
});

router.get('/:review',function(req,res,next){
	Review.find({_id: req.params.review})
	.then(review => res.send(review))
	.then(null,next)
});

router.put('/:reviewId',function(req,res,next){
	Review.findByIdAndUpdate(req.params.reviewId, req.body, {new: true})
	.then(review => res.send(review))
	.then(null,next);
});


router.post('/:review',function(req,res,next){
	Review.create({
		user: req.body.user,
		product: req.body.product,
		text: req.body.text,
		starRating: req.body.starRating
	})
	.then(review => res.send(review))
	.then(null,next)
});

router.delete('/:review',function(req,res,next){
	Review.find({_id: req.params.review})
	.then(review => review.remove()
	.then(res.redirect('')))
	.then(null,next);
})