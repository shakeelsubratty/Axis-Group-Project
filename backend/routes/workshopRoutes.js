/**
 * workshopRoutes, provides the API routes to create a workshop
 * and view the details of the workshop as well as the users
 * and ideas that are in the workshop.
 */

//Application requirements
const Promise = require('bluebird');
const config = require('../config');
const workshopModel = require('../models/workshopModel');
const schema = require('../models/schema');

/**
 * workshopModel application routes
 */
module.exports = function(app) {

    /**
     * Create a new workshop
     */
    app.get(config.workshopRoot + '/create', function(req, res) {

        //Calls the workshopModel to create the workshop within mongodb
        workshopModel.createWorkshop(req.query.title, req.query.description).then(function(newId) {

            //Debug console output
            if (config.DEBUG) {
                console.log("[API accessed] [workshopRoute] /create/:title/:description; created workshop with id: " + newId);
            }
            res.writeHead(200, {"Content-Type": "text/plain"}); //Return 200 (OK) HTTP header
            res.write(newId); //Write the new workshop ID to the document
            res.end();
        });
    });

    app.get(config.workshopRoot + '/set/:id/closed', function(req, res) {
        workshopModel.closeWorkshop(req.params.id).then(function(ret) {
            if (config.DEBUG) {
                console.log(JSON.stringify(ret));
            }
            request.post(
                config.aiUrl + "/deleteworkshop",
                {json: req.params.id},
                function(error, response, body) {
                    if (config.DEBUG) {
                      console.log("[AI request made] deletworkshop, received error: " + error + "; and response: " + JSON.stringify(response) + "; and body: " + JSON.stringify(body));
                    }
                    res.sendStatus(200);
                }
            );
        });
    });

    /**
     * Sets a specified workshop to an 'active' state.
     * @param {string} :id - The ID of the workshop
     */
    app.get(config.workshopRoot + '/set/:id/active', function(req, res) {

        //Calls the workshopModel to update mongodb with the workshop's status
        workshopModel.activateWorkshop(req.params.id).then(function(ret){

            //Debug console output
            if (config.DEBUG) {
                console.log(ret);
            }
            res.sendStatus(200); //Respond with a 200 (OK) HTTP status
        });
    });



    /**
     * Fetch the users that are currently in a workshop.
     * @param {string} :id - The ID of the workshop
     */
    app.get(config.workshopRoot + '/view/:id/users', function(req, res) {

        //Fetch the workshop object from the schema using the provided ID
        schema.Workshop.findByIdAsync(req.params.id).then(function(workshop) {

            //Debug console outpiut
            if (config.DEBUG) console.log("[API accessed] [workshopRoute] /view/:id/users; found workshop: " + workshop);

            //If workshop object is found
            if (workshop) {

                //Fetch all users within the workshop
                workshop.findUsersAsync().then(function(users) {

                    //Debug console output
                    if (config.DEBUG) {
                        console.log("Found users in workshop:");
                        console.log(users);
                    }
                    res.json(users); //Return JSON encoded value of users
                });
            } else {
                res.sendStatus(404); //Return 404 (Not Found) status code if workshop does not exist
            }
        });
    });

    /**
     * Fetch the ideas within a workshop
     * @param {String} :id - The ID of the workshop
     */
    app.get(config.workshopRoot + '/view/:id/ideas', function(req, res) {

        //Find the workshop through the provided workshop ID
        schema.Workshop.findByIdAsync(req.params.id).then(function(workshop) {

            //Debug console output
            if (config.DEBUG) console.log("[API accesssed] [workshopRoute] /view/:id/ideas; found workshop: " + workshop);

            //If the workshop exists
            if (workshop) {

                //Fetch all ideas within the workshop
                workshop.findIdeasAsync().then(function(ideas) {

                    //Debug console output
                    if (config.DEBUG) {
                        console.log("Found ideas in workshop:");
                        console.log(ideas);
                    }
                    res.json(ideas); //Return JSON output of ideas
                });
            } else {
                res.sendStatus(404); //Return 404 (Not Found) HTTP status, if workshop not found
            }
        });
    });

    /**
     * Fetch the workshop information through a provided workshop ID
     * @param {string} :id - The provided ID of the workshop
     */
    app.get(config.workshopRoot + '/view/:id', function(req, res) {

        //Call the workshopModel to fetch the workshop information using the provided ID.
        workshopModel.getWorkshop(req.params.id).then(function(workshop) {

            //If the workshop exists
            if (workshop) {

                //Debug console output
                if (config.DEBUG) {
                    console.log("[API accessed] [workshopRoute] /view/:id; found workshop with title: " + workshop.title + " and description: " + workshop.description);
                }
                res.json(workshop); //Return JSON output of the workshop's title (question) and description
            } else {

                //Debug console output
                if (config.DEBUG) {
                    console.log("Failed to retrieve workshop with id: " + req.params.id);
                }
                res.sendStatus(404); //Return 404 (Not Found) HTTP status, if workshop not found
            }
        });
    });
};
