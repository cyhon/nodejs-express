const fs = require('fs');
const _ = require('underscore');

const config = require('./config');
const logger = require('./logger');

exports.jsonError = function (res, e) {
    logger.error('Error handling JSON request:', e.message ? e.message : e);
    if (e.stack) {
        logger.error(e.stack);
    }
    if (e.errors) {
        _.each(e.errors, function (error) {
            logger.error('Error handling JSON request:', error.message);
        });
    }
    res.status(e.status || 500).json({
        message: e.message ? e.message : e,
        error: config.PRODUCTION ? null : e.stack
    });
};

exports.InvalidArgumentError = function (message) {
    this.message = message || '';
    this.status = 400;
};

exports.AuthorizationError = function (message) {
    this.message = message || '';
    this.status = 403;
};

exports.ResourceNotFoundError = function (message) {
    this.message = message || '';
    this.status = 404;
};

exports.logExpressError = function (e, req, res, next) {
    logger.error('Error handling request:', e.message ? e.message : e);
    if (e.stack) {
        logger.error(e.stack);
    }
    if (e.errors) {
        _.each(e.errors, function (error) {
            logger.error('Error handling request:', error.message);
        });
    }
    next(e);
};


