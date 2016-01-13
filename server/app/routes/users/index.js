'use strict';

var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;

var User = mongoose.model('User');

router.get('/',function(req,res,next){
	User.find({})
	.then(users =>res.json(users))
	.then(null,next);
});

router.get('/fake',function(req,res,next){
	User.findById('5696b17ec000895d08f9a8a9')
	.then(users =>{
            //console.log("THis is the failed search", users);
            res.json(users)
        })
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

router.post('/',function(req,res,next){
	User.create(req.body)
	.then(user => res.status(201).send(user))
	.then(null,next);
});

router.delete('/:id',function(req,res,next){
	User.findByIdAndRemove(req.params.id)
	.then(user => res.send(user))
	.then(null,next)
});
