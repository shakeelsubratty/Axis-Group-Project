/**
 * authModel, provides the database functions to create facilitators and
 * validate provided facilitator credentials.
 */

//Application requirements
const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const config = require ('../config');
var schema = require('./schema');
var Facilitator = schema.Facilitator; //Facilitator Schema

/**
 * authModel application functions
 */
module.exports = {

  /**
   * Creates a Facilitator account.
   * @param {string} user - The username for the account
   * @param {string} pass - The password for the account
   * @return {string} - The ID of the new facilitator account
   */
  createFacilitator: function(user, pass) {

    //Add a new facilitator with the provided credentials, returning the new facilitator.
    return Facilitator({username: user, password: pass}).saveAsync().then(function(newUser) {
        return newUser.id; //Return new facilitator ID
    });
  },

  /**
   * Authenticates provided credentials, validating they match an account in mongodb.
   * @param {string} user - The provided username of the account
   * @param {string} pass - The provided password of the account
   * @return {boolean} - Indicates whether the provided parameters are valid.
   */
  authenticate: function(user, pass) {

    //Search mongodb for an account that has both the same username and password as provided.
    return Facilitator.findOneAsync({username: user, password: pass}).then(function(authenticated) {
      return (authenticated) ? true : false; //Return whether or not a result object is found
    });
  }
}
