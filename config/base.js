// Production flag, this will be used to toggle logging, error trace, etc.
module.exports.PRODUCTION = false;

// Setting this to null will output logs to the log folder of current application.
module.exports.LOG_DIR = null;

module.exports.HTTP_PORT = 3000;

module.exports.REDIS_HOST = '127.0.0.1';
module.exports.REDIS_PORT = 6379;
module.exports.REDIS_OPTIONS = null;

// MongoDB settings.
module.exports.MONGO_DB_CONNECTION_STRING = process.env.MONGO_URL || 'mongodb://db-user:db-user-pwd@localhost:27017/your_db_name';

// Database opts.
module.exports.DB_CONNECTION_OPTS = {mongos: false, auth: {authdb: "admin"}};


