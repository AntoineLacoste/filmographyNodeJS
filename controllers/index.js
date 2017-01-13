var router = require('express').Router();

router.use('/admin', require('./adminController'));
router.use('/post', require('./movieController'));

module.exports = router;
