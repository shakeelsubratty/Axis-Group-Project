/**
 * workshopModel, provides the database functions to create
 * and fetch a workshop.
 */

//Application requirements
const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const config = require ('../config');
var schema = require('./schema');
var Workshop = schema.Workshop;

/**
 * workshopModel application functions
 */
module.exports = {

    /**
     * Creates a workshop with a provided title (question) and description.
     * @param {string} workshopTitle - The question of the workshop
     * @param {string} workshopDescription - Further information about the workshop
     * @return {string} - The ID of the new workshop
     */
    createWorkshop: function(workshopTitle, workshopDescription) {

        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        //Create a new workshop, saving within mongodb
        return Workshop({title: workshopTitle, description: workshopDescription}).saveAsync().then(function(newWorkshop) {
            console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");

            //Debug console output
            if (config.DEBUG) {
                console.log("Created workshop with title: " + newWorkshop.title + "; and description: " + newWorkshop.description);
            }
            return newWorkshop.id; //Return the new workshop ID
        });
    },

    /**
     * Fetches a workshop title and description from a workshop ID
     * @param {string} id - The provided ID of the workshop to find
     * @return {(string, string)} - The title and description of the workshop
     */
    getWorkshop: function(id) {

        //Locate the workshop object through the ID within mongodb
        return Workshop.findById({'_id': id}).then(function(workshop) {

            //If no workshop found
            if (!workshop) {

                //Debug console output
                if (config.DEBUG) {
                    console.log("Attempted to retrieve workshop with id: " + id + "; no such workshop");
                }
                return null; //Return null, as no workshop found
            }

            //Debug console output
            if (config.DEBUG) {
                console.log("Retrieved workshop with id: " + id + "; it has title: " + workshop.title, "; active: " + workshop.active);
            }

            //Return the workshop's title and description
            return { title: workshop.title, description: workshop.description, active: workshop.active, closed: workshop.closed };
        });
    },

    /**
     * Sets a workshop to be active, allowing participants to connect.
     * @param {string} id - The ID of the workshop to activate
     * @return {Workshop} - The workshop that has been activated
     */
    activateWorkshop: function(id) {
        return Workshop.updateAsync({_id: id}, {active: true});
    },

    closeWorkshop: function(id) {
        return Workshop.updateAsync({_id: id}, {closed: true, active: false});
    }
}
