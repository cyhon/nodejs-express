const express = require('express');
const path = require('path');
const monitor = require('node-client');
const logger = require('morgan');
const bodyParser = require('body-parser');
const qs = require('qs');
// const cors = require('cors');
const compression = require('compression');
const utils = require('./utils');
const expressValidator = require('express-validator');

const config = utils.config;

const app = express();
app.use(compression());

monitor.Instrument(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.set('query parser', s => qs.parse(s, { depth: 10 }));

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// 定义 validator 中间件的格式
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg
            // value : value
        };
    }
}));

// // Enabling CORS
// app.use(cors());
// app.options('*', cors());

// utils.info('PRODUCTION: %s', config.PRODUCTION);
// app.use('/console', express.static(path.join(__dirname, 'auth-center-statistics-console')));

app.use('/api/v1', require('./routes'));

// catch 404 and forward to error handler
app.use(({url}, res, next) => {
    utils.error('Url cannot be resolved: %s', url);
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// log errors
app.use(utils.logExpressError);

// development error handler
// will print stacktrace
if (!config.PRODUCTION) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(({status, message}, req, res, next) => {
  res.status(status || 500);
  res.render('error', {
    message,
    error: {}
  });
});

module.exports = app;
