const _ = require('underscore');
const Promise = require('bluebird');
const utils = require('../../utils');
const models = require('../../models');
const serviceInterface = require('../interface');
const redisService = require('./redis-service');
const mongodbService = require('./mongodb-service');

const instance = Object.create(serviceInterface);
const services = [mongodbService, redisService];
const logger = utils.getLogger('[HYBRID] ');

const RECENT_CONTACTS_LIMIT = 1000;
const PENDING_MESSAGE_LIMIT = 1000;
const ONE_OFF_MESSAGE_LIMIT = 500;
const TIMEOUT = 11000;

// Extend services
_.each(services, (service) => {
  _.each(_.keys(service), (name) => {
    if (_.isFunction(service[name]) && _.isFunction(serviceInterface[name])) {
      addFunction(service, name);
    }
  });
});

function addFunction(service, name) {
  const referenceFunction = service[name];
  instance[name] = (...args) => referenceFunction.apply(instance, args);
}

instance.ackMessages = (appId, regId, messageIds) => Promise.all([
  redisService.removePendingMessages(appId, regId, messageIds),
  mongodbService.ackMessages(appId, regId, messageIds),
]);


module.exports = instance;
