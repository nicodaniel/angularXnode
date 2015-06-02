var express = require('express');

module.exports = function(app, config) {  
    app.configure(function() {
//    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.static(config.clientPath));
  });
}
