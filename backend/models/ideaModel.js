/**
 * ideaModel, provides the database functions to create, view
 * and delete ideas.
 */

//Application requirements
const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const mongodb = require('mongodb');
const config = require('../config');
const schema = require('./schema');
const Idea = schema.Idea; //Idea schema

/**
 * ideaModel application functions
 */
module.exports = {

  /**
   * Creates a new idea for the user within a workshop
   * @param {string} ideaTitle - Title the user provided for their idea
   * @param {string} ideaDescription - Description the user provided for their idea
   * @param {string} userId - The ID of the user providing the idea
   * @return {string} - The ID of the new idea
   */
  createIdea: function(ideaTitle, ideaDescription, userId) {

    //Find the user within the user database
    return schema.User.findByIdAsync(userId).then(function(user) {
      var workshopId = user.workshop; //Get the ID of the workshop that they are in

      //Create the new idea with the provided details, saving in mongodb
      return Idea({title: ideaTitle, description: ideaDescription, user: userId, workshop: workshopId}).saveAsync();
    }).then(function(newIdea) {

      //Debug console output
      if (config.DEBUG) {
          console.log("Created idea with title: " + newIdea.title + " for user: " + newIdea.user);
      }
      return newIdea.id; //Return the ID of the new idea
    });
  },

  /**
   * View the details of an idea from a provided idea ID.
   * @param {string} id - The ID of the idea
   * @return {idea} - The idea that has the provided ID
   */
  viewIdea: function(id) {

    //Debug console output
    if (config.DEBUG) {
        console.log("accessing idea with ID: " + id);
        schema.Idea.findByIdAsync(id).then(function(ret){console.log(ret);});
    }
    return schema.Idea.findByIdAsync(id); //Return the idea object in mongodb
  },

  /**
   * Delete an idea with a provided idea ID.
   * @param {string} id - The ID of the idea
   */
  deleteIdea: function(id) {

    //Debug console output
    if (config.DEBUG) {
        console.log("deleting ideas with ID: " + id);
        schema.Idea.findAsync({_id: id}).then(function(ret){console.log(ret);});
    }

    //Remove the idea object within mongodb that has the provided ID
    return schema.Idea.remove({_id: new mongodb.ObjectId(id)}, function(err, result) {

      //Debug console output
      if(config.DEBUG) {
        if (err) {
            console.log("Unable to delete idea with ID: " + id);
        } else {
            console.log("Delete of idea" + id + "is successful!");
        }
      }
    });
  }
}
