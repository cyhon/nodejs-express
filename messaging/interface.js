const Promise = require('bluebird');

const instance = {};

instance.ready = () => Promise.resolve();

/************ register ************/

// The setter takes a register parameter and return a promise when it has finished setting property of the register
// Using this approach, the implementation can support optimistic locking
instance.setRegister = (appId, regId, setter) => Promise.resolve();

instance.getRegister = (appId, regId) => Promise.resolve({appId, regId});

instance.getRegisters = (appId, regIds) => Promise.resolve([]);

instance.getRegistersByRole = (appId, role) => Promise.resolve([]);

instance.getRecentContacts = (appId, regId) => Promise.resolve([]);


module.exports = instance;
