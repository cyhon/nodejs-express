'use strict';

const _ = require('underscore');

// Allow error to be serialized.
Object.defineProperty(Error.prototype, 'toJSON', {
    value: function () {
        const alt = {};

        Object.getOwnPropertyNames(this).forEach(function (key) {
            alt[key] = this[key];
        }, this);

        return alt;
    },
    configurable: true,
    enumerable: false,
    writable: true
});

module.exports.config = require('./config');
_.extend(module.exports,
    require('./io'), require('./logger'), require('./web'));
