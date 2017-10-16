const _ = require('underscore');
const utils = require('../../utils');
const logger = utils.getLogger('[MONGODB] ');
const models = require('../../models');
const uuidV4 = require('uuid/v4');
const ssha = require("ssha");

const instance = Object.create(require('../interface'));

instance.ready = function () {
    return models.ready();
};

instance.addRegister = async function (userId, phone, email, password, isBot = false) {
    if (!isBot) { // 机器人注册时 不检查 phone email等
        const user = await findRegister(userId, phone);
        if (user) {
            throw new Error('用户已注册')
        }
    }

    const registerDAO = new models.Register({
        uuid: uuidV4(),
        userId: userId,
        email: email,
        phone: phone,
        password: ssha.create(password),
        isBot: isBot
    });
    return registerDAO.saveAsync()
};

async function findRegister(userId, phone) {
    return await models.Register.findOneAsync({userId, phone});
}

instance.findUsersById = async function findUsersById(userId) {
    return await models.Register.findAsync({'userId': {'$regex': '^' + userId + '.*', '$options': 'i'}});
};

instance.findUsersByPhone = async function findUsersByPhone(phone) {
    return await models.Register.findAsync({'phone': {'$regex': '^' + phone + '[0-9]*'}});
};

instance.setPassword = function (userId, password) {
    const pwd_hash = ssha.create(password);

    return new Promise((resolve, reject) => {
        models.Register.update(
            {'userId': {'$regex': '^' + userId + '.*', '$options': 'i'}},
            {$set: {pwd_hash}},
            (err) => {
                if (err) reject(err);
                resolve();
            }
        );
    });
};

/************* auth ********************/
instance.authenticate = async function (userId, password) {
    const userRS = await models.Register.findAsync({userId: userId}, { password: 1 });

    if (!userRS || !userRS[0]) {
        return false;
    }

    const pwd_hash = userRS[0]._doc.password;

    if (pwd_hash) {
        if (pwd_hash.startsWith("{SSHA}")) {
            return ssha.verify(password, pwd_hash)
        } else {
            return pwd_hash === password;
        }
    } else {
        return false;
    }
};


module.exports = instance;
