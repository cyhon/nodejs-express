const express = require('express');
const utils = require('../../utils');
const logger = utils.getLogger('[API/Auth] ');
const mongoDbService = require('../../messaging/storage/mongodb-service');

const router = express.Router();

router.post('/auth', async function (request, response) {
    const {userId, password} = request.body;

    logger.info(`received auth_req ${userId}, ${password}`);

    const isAuthSucc = await mongoDbService.authenticate(userId, password);

    if (isAuthSucc) {
        const res_msg = {status: 200, message: "认证成功"};
        response.json(res_msg);
    } else {
        const res_msg = {status: 401, message: "用户名/密码错误"};
        response.json(res_msg);
    }
});


module.exports = router;

