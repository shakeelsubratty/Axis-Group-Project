/**
 * authRoutes, provides the API routes to authenticate facilitators
 * through the authModel functions.
 */

//Application requirements
const Promise = require('bluebird');
const config = require('../config');
const authModel = require('../models/authModel');
const Schema = require('../models/schema');

/**
 * authModel application routes
 */
module.exports = function(app) {

  /**
   * Route to create a facilitator account.
   * @param {string} :username - The username of the account
   * @param {string} :password - The password of the account
   */
  app.get(config.authRoot + '/create/:username/:password', function(req, res) {

    //Call the authentication model function to create a facilitator within mongodb
    authModel.createFacilitator(req.params.username, req.params.password).then(function(facilitator) {
        res.writeHead(200, {"Content-Type": "text/plain"}); //Return 200 (OK) HTTP header
        res.write(facilitator); //Write the model's return value to the document
        res.end();
    });
  });

  /**
   * Route to validate provided facilitator credentials.
   * @param {string} :username - The username provided for the account
   * @param {string} :password - The password provided for the account
   */
  app.get(config.authRoot + '/login/:username/:password', function(req, res) {

    //Call the authentication model function to authenticate facilitator credentials within mongodb
    authModel.authenticate(req.params.username, req.params.password).then(function(authenticated) {
        res.jsonp(authenticated); //Return a JSON encoded value returned by the model
        res.end();
    });
  });
};
