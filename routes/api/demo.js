const express = require('express');
const router = express.Router();
const error = require('../../spec/error');

router.get('/hello', async (request, response) => {
    response.send({msg: "hello, world!"})
});

router.get('/error', async (request, response) => {
    response.status(500).json(error.FC_ERROR)
});

module.exports = router;
