/**
 * ideaRoutes, provides the API routes to create and delete ideas
 * through the ideaModel functions.
 */

//Application requirements
const Promise = require('bluebird');
const config = require('../config');
const ideaModel = require('../models/ideaModel');
const Schma = require('../models/schema');

/**
 * ideaModel application routes
 */
module.exports = function(app) {

  /**
   * Create a new idea for the user
   * @param {string} :userId - The ID of the user creating the idea
   */
  app.get(config.ideaRoot + '/create/:userId', function(req, res) {

    //Call the ideaModel to create the idea within mongodb
    ideaModel.createIdea(req.query.title, req.query.description, req.params.userId).then(function(newId) {

      //Debug console output
      if (config.DEBUG) {
          console.log("[API accessed] [ideaRoute] /create/:userId, created user with id: " + newId);
      }
      res.writeHead(200, {"Content-Type": "text/plain"}); //Return 200 (OK) HTTP header
      res.write(newId); //Write the new idea's ID to the document
      res.end();
    });
  });

  /**
   * Delete the idea with the provided idea ID
   * @param {string} :id - The ID of the idea to delete
   */
  app.get(config.ideaRoot + '/delete/:id', function(req, res) {

    //Call the ideaModel to delete the idea within mongodb
    ideaModel.deleteIdea(req.params.id);
    res.sendStatus(200); //Return 200 (OK) status
  });
}
