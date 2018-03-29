/**
 * participantRoutes, provides the API routes to create a participant
 * and view their ideas through the participantModel functions.
 */

//Application requirements
const Promise = require('bluebird');
const config = require('../config');
const participantModel = require('../models/participantModel');
const schema = require('../models/schema');

/**
 * participantModel application routes
 */
module.exports = function(app) {

  /**
   * Create a new participant, linking to a workshop.
   * @param {string} :workshop - The ID of the workshop to add the participant to
   */
  app.get(config.participantRoot + '/create/:workshop', function(req, res) {

    return schema.Workshop.findById({'_id': req.params.workshop}).then(function(workshop) {
      if(workshop) {
        //Call the participantModel to create and add the new participant to a workshop
        participantModel.createParticipant(req.params.workshop).then(function(newId) {

          //Debug console output
          if (config.DEBUG) {
              console.log("[API accessed] [participantRoute] /create/:workshop; created user with id: " + newId);
          }
          res.writeHead(200, {"Content-Type": "text/plain"}); //Return 200 (OK) HTTP header
          res.write(newId); //Write the ID of the new participant to the document
          res.end();
        });
      } else {
        res.writeHead(200, {"Content-Type": "text/plain"}); //Return 200 (OK) HTTP header
        res.write("null"); //Return null for frontend system to process
        res.end();
      }
    });
  });

  /**
   * View the ideas of a provided participant.
   * @param {string} :id - The ID of the participant
   */
  app.get(config.participantRoot + '/view/:id/ideas', function(req, res) {

    //Locate the user object within the schema, through the provided ID
    schema.User.findByIdAsync(req.params.id).then(function(user) {

      //Debug console output
      if (config.DEBUG) {
          console.log("[API accessed] [participantRoute] /view/:id; found user: " + user);
      }

      //If the user object is found through the provided ID
      if (user) {

        //Find the ideas the participant has provided
        user.findIdeasAsync().then(function(ideas) {

          //Debug console output
          if (config.DEBUG) {
              console.log("Found ideas for user:");
              console.log(ideas);
          }
          res.json(ideas); //Return JSON encoded value of ideas
        });
      } else {
          res.sendStatus(404); //Return 404 (Not Found) status, as user not found
      }
    });
  });
};
