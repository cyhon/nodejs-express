const uuid = require('uuid/v4');
const cls = require('continuation-local-storage');

const TRACE_ID = 'x-trace-id';
const traceRequest = cls.createNamespace(TRACE_ID);

module.exports = function (req, res, next) {
    traceRequest.run(() => {
        const traceId = req.header(TRACE_ID) || uuid();
        res.setHeader(TRACE_ID, traceId);
        traceRequest.set('traceId', traceId);
        next();
    });
};
