const uuid = require('uuid/v4');

const TRACE_ID = 'x-trace-id';

module.exports = function (req, res, next) {
    const traceId = req.header(TRACE_ID) || uuid();
    req[TRACE_ID] = traceId;
    res.setHeader(TRACE_ID, traceId);
    next();
};
