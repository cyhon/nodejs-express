const Promise = require('bluebird');
const mongoose = require('mongoose');

const hit = require('../metrics').hit;
const _ = require('underscore');
const utils = require('../utils');
const config = utils.config;

mongoose.connection.on('connected', function () {
    hit('db.connection.connected');
    utils.log('Mongoose default connection connected.');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    hit('db.connection.error');
    utils.error('Mongoose default connection error: ', err);
    process.exit(1);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    hit('db.connection.disconnected');
    utils.log('Mongoose default connection disconnected.');
    process.exit(1);
});

function connect() {
    return new Promise(function (resolve, reject) {
        const options = _.clone(config.DB_CONNECTION_OPTS);
        options.server = { reconnectTries: Number.MAX_VALUE, socketOptions: { connectTimeoutMS: 1000 } };
        mongoose.connect(config.MONGO_DB_CONNECTION_STRING, options, function (error) {
            if (error) {
                utils.error(error);
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

function ready() {
    if (!ready.promise) {
        ready.promise = connect();
    }
    return ready.promise;
}

function ensureConnected() {
    if (mongoose.Connection.STATES.connected !== mongoose.connection.readyState) {
        throw new Error('Mongodb not connected!');
    }
}

exports.ready = ready;
exports.ensureConnected = ensureConnected;

exports.constants = require('./constants');
exports.Register = require('./register');

// promisify
Promise.promisifyAll(mongoose.Model);
Promise.promisifyAll(mongoose.Model.prototype);
Promise.promisifyAll(mongoose.Query.prototype);
