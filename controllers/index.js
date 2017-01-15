var router = require('express').Router();

router.use('/admin', require('./adminController'));
router.use('/', require('./movieController'));
router.use('/config', require('./configController'));

module.exports = router;
