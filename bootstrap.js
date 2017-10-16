const utils = require('./utils');
const db = require('./models');
const app = require('./app');
const server = require('http').Server(app);
const config = utils.config;
const logger = utils.getLogger('[bootstrap] ');


async function startAll() {
    try {
        await db.ready();

        server.listen(config.HTTP_PORT || 80, function () {
            utils.info('Express server listening on port %s', server.address().port);
        });

    } catch (err) {
        utils.error('Service starting error:', err.stack);
        process.exit(1);
    }
}

startAll();
