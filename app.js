const express = require('express');
const monitor = require('node-client');
const logger = require('morgan');
const bodyParser = require('body-parser');
const qs = require('qs');
// const cors = require('cors');
const compression = require('compression');
const utils = require('./utils');
const expressValidator = require('express-validator');
const error = require('./spec/error');

const app = express();
app.use(compression());

monitor.Instrument(app);

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

app.use('/api/v1', require('./routes'));

// catch 404 and forward to error handler
app.use(({url}, res, next) => {
    res.status(404).json(error.FC_NOT_FOUND);
});

// log errors
app.use(utils.logExpressError);

app.use(({status, message}, req, res, next) => {
    res.status(500).json(error.FC_ERROR);
});

module.exports = app;
