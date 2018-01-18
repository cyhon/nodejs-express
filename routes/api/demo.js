const express = require('express');
const router = express.Router();
const error = require('../../spec/error');
const logger = require('../../utils').getLogger('demo');

router.get('/hello', async (request, response) => {
    logger.info('before async await...');
    await new Promise(resolve => { setTimeout(resolve, 1) });
    logger.info('after async await...');
    response.send({msg: "hello, world!"})
});

router.get('/error', async (request, response) => {
    response.status(500).json(error.FC_ERROR)
});

module.exports = router;
