var mongoose    = require( 'mongoose' ),
    autoIncrement = require('mongoose-auto-increment'),
		Diagram     = require('../models/Diagram'); 
  
module.exports = function(config) {
  // Create the database connection
  mongoose.connect(config.db);

  // Define connection events
  mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + config.db);
  });

  mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
  });

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
    });
  });

};