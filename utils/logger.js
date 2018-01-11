'use strict';

const winston = require('winston');
const config = require('../config/base');
const cls = require('continuation-local-storage');

function getTimestamp() {
    return new Date().toISOString().replace('T', ' ').replace('Z', '')
}

function getLogger(name) {
    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                name,
                formatter,
                level: config.LOG_LEVEL,
                handleExceptions: true,
                json: false,
            })
        ],
        exitOnError: false
    });

    function formatter(info) {
        const traceId = cls.getNamespace('x-trace-id').get('traceId') || '';
        return `[${getTimestamp()} ${info.level} ${name}] ${traceId} - ${info.message || JSON.stringify(info.meta)}`;
    }
}

const logger = getLogger('BOOTSTRAP');
exports.log = function() { logger.info.apply(logger, arguments); };
exports.debug = function() { logger.debug.apply(logger, arguments); };
exports.info = function() { logger.info.apply(logger, arguments); };
exports.warn = function() { logger.warn.apply(logger, arguments); };
exports.error = function() { logger.error.apply(logger, arguments); };

exports.getLogger = getLogger;
