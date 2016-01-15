'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));
router.use('/categories', require('./categories'));
router.use('/address', require('./address'));
router.use('/orderitems', require('./orderItems'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
