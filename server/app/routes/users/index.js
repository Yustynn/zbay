'use strict';

var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var bodyParser = require('body-parser');
var User = require('../../db/user.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/',function(req,res,next){
	User.find({})
	.then(users =>res.send(users))
	.then(null,next);
});

router.get('/:user',function(req,res,next){
	User.find({_id: req.params.user})
	.then(user => res.json(user))
	.then(null,next);
});

router.put('/:userId',function(req,res,next){
	User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
	.then(user => res.send(user))
	.then(null,next);
});

router.post('/:user',function(req,res,next){
	User.create({
		email: req.body.email,
		password: req.body.password,
		salt: req.body.salt,
		twitter: req.body.twitter,
		facebook: req.body.facebook,
		google: req.body.google})
	.then(user => res.send(user))
	.then(null,next);
});

router.delete('/:user',function(req,res,next){
	User.find({_id: req.params.user})
	.then(user => user.remove()
	.then(res.redirect('')))
	.then(null,next);
});

