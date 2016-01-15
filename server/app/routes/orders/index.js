'use strict';
const router = require('express').Router();
module.exports = router;

import { mustBeAdmin, mustBeLoggedIn } from '../../../helpers/routesPermissions'
import {
  createDoc,
  getAllDocsAndSend,
  getDocAndSendIfOwnerOrAdmin,
  getDocAndUpdateIfOwnerOrAdmin,
  getDocAndDeleteIfOwnerOrAdmin
} from '../../../helpers/routesCrud';

/**
 * CRUD operations
 * Admin gets all orders for CRUD
 * Registered users can access CRUD for individual Orders
 */


router.post('/', mustBeLoggedIn, createDoc('Order', true));

router.get('/', mustBeAdmin, getAllDocsAndSend('Order'));

router.get('/:id', mustBeLoggedIn, getDocAndSendIfOwnerOrAdmin('Order'));

router.put('/:id', mustBeLoggedIn, getDocAndUpdateIfOwnerOrAdmin('Order'))

router.delete('/id', mustBeLoggedIn, getDocAndDeleteIfOwnerOrAdmin('Order'))

/**
 * This is the end of the file. Below is kept
 * temporarily as above is yet untested.
 **/







 // const mongoose = require('mongoose');
 // const Order = mongoose.model('Order');
/**
 *  These CRUD operations should be accessible by both admin and individual users
 *  TODO : Need to check that the user is the individual user with that order
 */
// router.post('/', (req, res, next) => {
//   Order.create(req.body)
//     .then( order => res.json(order) )
//     .then( null, next );
// });

// router.get('/:id', (req, res, next) => {
//   let id = req.params.id;
//   Order.findOne(id)
//     .then( order => res.json(order) )
//     .then( null, next );
// });

// router.put('/:id', (req, res, next) => {
//   let id = req.params.id;
//   Order.findByIdAndUpdate(id, req.body, {new : true})
//     .then( order => res.json(order) )
//     .then( null , next );
// });


// router.delete('/:id', (req, res, next) => {
//   let id = req.params.id;
//   Order.findByIdAndRemove(id)
//     .then( order => res.json(order) )
//     .then( null, next);
// });


//
// /**
//  *  These / CRUD can only be accessed if you are admin
//  *  otherwise should send a 401 user unauthorized
//  */
// router.post('/', (req, res, next) => {
//   if (!isAdmin) return res.status(401).end();
//   Order.create(req.body)
//     .then( order => res.json(order))
//     .then( null, next);
// });
//
// /**
//  *  This will return all orders
//  *  To find individual orders can do this
//  *  model.find({'_id' : {$in : [id1, id2, id3, ...]}})
//  */
// router.get('/', (req, res, next) => {
//   if (!isAdmin) return res.status(401).end();
//   Order.find()
//     .then( orders => res.json(orders))
//     .then( null, next);
// });
//
// router.put('/', (req, res, next) => {
//   if (!isAdmin) return res.status(401).end();
//   Order.find()
//     // what is a better way of updating each order
//     // what is use case for this?
//     .then(orders => {
//       let promisesForUpdatedOrders = orders.map(order => {
//         order.update(req.body);
//       })
//       return Promise.all(promisesForUpdatedOrders);
//     })
//     .then( updatedOrders => res.json(updatedOrders) )
//     .then( null, next );
// });
