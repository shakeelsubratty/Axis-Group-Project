const Promise = require('bluebird');
const config = require('../config');
const authModel = require('../models/authModel');
const Schema = require('../models/schema');

module.exports = function(app) {

  app.get(config.authRoot + '/create/:username/:password', function(req, res) {
    authModel.createFacilitator(req.params.username, req.params.password).then(function(facilitator) {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write(facilitator);
        res.end();
    });
  });

  app.get(config.authRoot + '/login/:username/:password', function(req, res) {
    authModel.authenticate(req.params.username, req.params.password).then(function(authenticated) {
        res.jsonp(authenticated);
        res.end();
    });
  });
};
