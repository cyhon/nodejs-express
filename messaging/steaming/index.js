// const kafka = require('node-rdkafka');
// const avro = require('avsc');
//
// const utils = require('../../utils');
// const logger = utils.getLogger('[Streaming]');
//
// const userRecordEventParser = avro.Type.forSchema({
//     namespace: "com.finogeeks.eventmodel.uc",
//     type: "record",
//     name: "UserRecordChanged",
//     fields: [
//         {name: "userId", type: "string"},
//         {name: "password", type: "string"},
//         {name: "action", type: "string"},
//         {name: "userType", type: "string"},
//         {name: "displayName",  type: "string"},
//         {name: "mobile", type: "string"},
//         {name: "email", type: "string"},
//         {name: "isBot", type: "boolean", default: false},
//         {name: "enableGroupChat", type: "boolean", default: true}
//     ]
// });
//
// const streaming = {};
//
// streaming.ready = async (kafka_opts) => {
//     logger.info('starting kafka Producer ...');
//     logger.info(`librdkafkaVersion  ${kafka.librdkafkaVersion}`);
//
//     const globalConfig = {
//         'metadata.broker.list': kafka_opts.broker_addrs,
//         'dr_cb': true
//     };
//
//     const topicConfig = {
//         'enable.auto.commit': true
//     };
//
//     const producer = new kafka.Producer(globalConfig);
//
//     producer.connect();
//
//     producer.on('delivery-report', function(err, report) {
//         console.log(report);
//     });
//
//     producer.on('ready', function() {
//         logger.info('Kafka producer is ready')
//     });
//
//     producer.on('event.error', err => {
//         logger.error('Error from producer' + err.message);
//     });
//
//     streaming.sender = producer;
//     streaming.userRecordEventParser = userRecordEventParser;
//
// };
//
//
// module.exports = streaming;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
