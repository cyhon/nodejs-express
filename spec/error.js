const config = require('../config/base');

function error(errcode, error) {
    return {
        errcode,
        error,
        service: config.SERVICE_NAME,
    }
}

module.exports = {
    FC_NOT_FOUND: error('FC_NOT_FOUND', 'Not Found'),

    FC_ERROR: error('FC_ERROR', '服务异常'),
};
