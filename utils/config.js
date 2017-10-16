const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const logger = console;
const confDir = path.resolve(__dirname, '../config');
const baseConf = require(path.join(confDir, 'base.js'));
let envConf,
  modifierConf = {};

// const config = _.assign(baseConf, envConf, modifierConf);
const config = baseConf;

// load from env variables as last truth source
_.map(_.keys(config), (k) => {
  // Todo 类型转换 number, boolean
  let eVal = process.env[k];
  if(eVal === 'true') {
    eVal = true;
  }
  if(eVal === 'false') {
    eVal = false;
  }
  if(`${+eVal}` === eVal) {
    eVal = +eVal
  }
  eVal && (config[k] = eVal);
});

if (process.env.NODE_ENV) {
  config.PRODUCTION = process.env.NODE_ENV.toLowerCase() === 'production';
}

logger.info(config);
module.exports = config;
