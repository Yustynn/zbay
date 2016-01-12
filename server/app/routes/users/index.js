'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;

var User = mongoose.model('User');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/',function(req,res,next){
	User.find({})
	.then(users =>res.json(users))
	.then(null,next);
});

router.get('/:id',function(req,res,next){
	User.findById(req.params.id)
	.then(user => res.json(user))
	.then(null,next);
});

router.put('/:id',function(req,res,next){
	User.findByIdAndUpdate(req.params.id, req.body, {new: true})
	.then(user => res.json(user))
	.then(null,next);
});

router.post('/:id',function(req,res,next){
	User.create({
		email: req.body.email,
		password: req.body.password,
		salt: req.body.salt,
		twitter: req.body.twitter,
		facebook: req.body.facebook,
		google: req.body.google
	})
	.then(user => res.json(user))
	.then(null,next);
});

router.delete('/:id',function(req,res,next){
	User.findByIdAndRemove(req.params.id)
	.then(user => res.redirect(''))
	.then(null,next)	
});

