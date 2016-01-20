'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/categories', require('./categories'));
router.use('/members', require('./members'));
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));
router.use('/reviews', require('./reviews'));
router.use('/users', require('./users'));
router.use('/orderitem', require('./orderItems'));
router.use('/mandrill', require('./mandrill'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
