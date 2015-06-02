
var path = require('path'),
    clientPath  = path.normalize(__dirname + '/../../client'),
    security    = require('./security'),
    diagrams     = require('../controllers/diagrams');

module.exports = function(app) {
  
  // routes for schemas
  app.get('/api/schemas/', diagrams.getSchema); //get All Schema
  app.get('/api/schemas/:name', diagrams.getSchemaByName); 
  app.post('/api/schemas/save/', diagrams.saveDiagram); // save a schema 
  app.delete('/api/schemas/:id', diagrams.delete); //delete schema

  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  app.get('*', function(req, res) {
    res.sendfile(clientPath+'/index.html');
  });
  
}
