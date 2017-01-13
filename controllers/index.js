var router = require('express').Router();

router.use('/admin', require('./adminController'));
router.use('/', require('./movieController'));

module.exports = router;
