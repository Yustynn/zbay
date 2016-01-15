'use strict';

var router = require('express').Router();
module.exports = router;

import { mustBeAdmin, mustBeLoggedIn } from '../../../helpers/routesPermissions'
import {
	createDoc,
	getAllDocsAndSend,
	getDocAndSend,
	getDocAndUpdateIfOwnerOrAdmin,
	getDocAndDeleteIfOwnerOrAdmin }
from '../../../helpers/routesCrud';

router.post('/', mustBeLoggedIn, createDoc('Review', true))

router.get('/', getAllDocsAndSend('Review'))

router.get('/id', getDocAndSend('Review'))

router.put('/id', mustBeLoggedIn, getDocAndUpdateIfOwnerOrAdmin('Review'))

router.delete('/id', mustBeLoggedIn, getDocAndDeleteIfOwnerOrAdmin('Review'))


/**
 * This is the end of the file. Below is kept
 * temporarily as above is yet untested.
 **/

// var mongoose = require('mongoose');
// var Review = mongoose.model('Review');
//
// router.get('/',function(req,res,next){
// 	Review.find({})
// 	.then(reviews => res.json(reviews))
// 	.then(null,next)
// });
//
// router.get('/:id',function(req,res,next){
// 	Review.findById(req.params.id)
// 	.then(review => res.json(review))
// 	.then(null,next)
// });
//
// router.put('/:id',function(req,res,next){
// 	Review.findByIdAndUpdate(req.params.id, req.body, {new: true})
// 	.then(review => res.json(review))
// 	.then(null,next);
// });
//
//
// router.post('/',function(req,res,next){
// 	Review.create(req.body)
// 	.then(review => res.json(review))
// 	.then(null,next)
// });
//
// router.delete('/:id',function(req,res,next){
// 	Review.findByIdAndRemove(req.params.id)
// 	.then(review => res.send(201))
// 	.then(null,next)
// });
