const express = require('express');
const router = express.Router();

router.get('/hello', async (request, response) => {
    response.send({msg: "hello, world!"})
});

module.exports = router;
