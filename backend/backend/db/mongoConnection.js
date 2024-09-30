'use strict';
const mongoose = require('mongoose');
const config = require('../src/config.js');
require('colors');


/**
 * Check initial configurations like db connection, log folder existance, etc...
 * @returns {Promise}
 */
var initialize = function () {
  return connectConnectCRMDB()
};

var connectConnectCRMDB = function () {
  return new Promise((resolve, reject) => {
      mongoose.connect(config.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
      var ConnectCRMDB = mongoose.connection;
      ConnectCRMDB.once('connected', function connectionSuccess() {
          console.log('Internal Database Connection Establishement. '.bold.cyan + '[ ' + 'OK'.bold.green + ' ]');
          resolve();
      });
      ConnectCRMDB.once('reconnected', function connectionSuccess() {
          console.log('Internal Database Reconnection Establishement. '.bold.cyan + '[ ' + 'OK'.bold.green + ' ]');
          resolve();
      });

      ConnectCRMDB.on('disconnected', () => {
          console.log('Internal Database Disconnected'.bold.red);
      });

      ConnectCRMDB.on('error', function connectionError(err) {
          console.log('Internal Database Connection Establishement. '.bold.cyan + '[ ' + 'X'.bold.red + ' ]\n');
          console.log('Error connecting Internal Database.\nDetails: ' + err.toString().bold.red);
          process.exit(0);
      });
  });
};

process.on('SIGINT', () => {
  mongoose.connection.close()
      .then(() => {
          process.exit(0);
      });
});

module.exports.initialize = initialize;
module.exports.CompanyDB = mongoose.createConnection('mongodb+srv://zakir:qcodes123@zakir.t9i4ypj.mongodb.net/connectsouq', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});