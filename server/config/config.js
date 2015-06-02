var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');
    clientPath = path.normalize(__dirname + '/../../client');

module.exports = {
  development: {
    db: 'mongodb://172.30.90.55:27017/mydb',
    rootPath: rootPath,
    clientPath: clientPath,
    port: process.env.PORT || 3000
  },
  production: {
     db:'mongodb://172.30.90.55:27017/mydb', 
    rootPath: rootPath,
    clientPath: clientPath,
    port: process.env.PORT || 80
  }
};