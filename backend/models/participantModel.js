/**
 * participantModel, provides the database functions to create
 * participants within a workshop.
 */

//Application requirements
const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const config = require ('../config');
var schema = require('./schema');
var User = schema.User; //User schema

/**
 * participantModel application functions
 */
module.exports = {

  /**
   * Create an anonymous participant for the workshop
   * @param {string} workshopId - The ID of the workshop the participant is entering
   * @return {string} - The ID of the new participant
   */
  createParticipant: function(workshopId) {

    //Create a user (participant) within a workshop
    return User({workshop: workshopId}).saveAsync().then(function(newUser) {

      //Debug console output
      if (config.DEBUG) {
        console.log("Created participant with name: " + newUser.name + "; and id: " + newUser._id + "; attached to workshop: " + newUser.workshop);
      }
      return newUser.id; //Return ID of new participant
    });

  },
}
