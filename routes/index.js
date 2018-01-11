const express = require('express');
const router = express.Router();

const demo = express.Router();
demo.use(require('./api/demo'));
router.use('/demo', demo);

module.exports = router;
