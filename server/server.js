var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var app = express();

var config = require('./config/config')[env];

require('./config/mongoose')(config);

require('./config/express')(app, config);

require('./config/routes')(app);

app.listen(config.port);

console.log('Listening on port ' + config.port + '...');
