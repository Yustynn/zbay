'use strict';

var router = require('express').Router();
module.exports = router;

import { mustBeAdmin, mustBeLoggedIn } from '../../../helpers/routesPermissions'
import {
  createDoc,
  getAllDocsAndSend,
  getDocAndSendIfOwnerOrAdmin,
  getDocAndUpdateIfOwnerOrAdmin,
  getDocAndDeleteIfOwnerOrAdmin
} from '../../../helpers/routesCrud';


router.post('/', createDoc('User'));

router.get('/', mustBeAdmin, getAllDocsAndSend);

router.get('/:id', mustBeLoggedIn, getDocAndSendIfOwnerOrAdmin('User'));

router.put('/:id', mustBeLoggedIn, getDocAndUpdateIfOwnerOrAdmin('User'));

router.delete('/id', mustBeLoggedIn, getDocAndDeleteIfOwnerOrAdmin('User'));


// var mongoose = require('mongoose');
// var User = mongoose.model('User');
//
// router.get('/',function(req,res,next){
// 	User.find({})
// 	.then(users =>res.json(users))
// 	.then(null,next);
// });
//
// router.get('/:id',function(req,res,next){
// 	User.findById(req.params.id)
// 	.then(user => res.json(user))
// 	.then(null,next);
// });
//
// router.put('/:id',function(req,res,next){
// 	User.findByIdAndUpdate(req.params.id, req.body, {new: true})
// 	.then(user => res.json(user))
// 	.then(null,next);
// });
//
// router.post('/',function(req,res,next) {
//     User.create(req.body)
//         .then(user => res.status(201).send(user))
//         .then(null, next);
// });
//
// router.delete('/:id',function(req,res,next){
// 	User.findByIdAndRemove(req.params.id)
// 	.then(user => res.send(user))
// 	.then(null,next)
// });
