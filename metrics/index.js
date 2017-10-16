const _ = require('lodash');
const Redis = require('ioredis');
const utils = require('../utils');
const incr = require('../statsd').incr;
const config = utils.config;
const logger = utils.getLogger('[METRICS] ');

const client = new Redis({
    port: config.REDIS_PORT,
    host: config.REDIS_HOST
});

const TYPES = [
    'day',
    'hour'
];

function getMetricsPath (type, name) {
    return utils.format('metrics.finogeeks.club:metrics.%s.%s',
        encodeURIComponent(type), encodeURIComponent(name));
}

module.exports.types = TYPES;

module.exports.hit = function (name) {
    client.sadd('metrics.finogeeks.club:metrics:events', name);
    incr(name);
    _.each(TYPES, function (type) {
        var key = getMetricsPath(type, name);
        client.incr(key)
            .catch(function (error) {
                logger.error(error);
            });
    });
};
