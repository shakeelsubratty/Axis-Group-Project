const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const config = require ('../config');
var Schma = require('./schema');
var Workshop = Schma.Workshop;

module.exports = {
    createWorkshop: function(workshopTitle, workshopDescription) {
        return Workshop({title: workshopTitle, description: workshopDescription}).saveAsync().then(function(newWorkshop) {
            if (config.DEBUG) {
                console.log("Created workshop with title: " + newWorkshop.title + "; and description: " + newWorkshop.description);
            }
            return newWorkshop.id;
        });
    },
    getWorkshop: function(id) {
        return Workshop.findById({'_id': id})
            .then(function(workshop) {
                if (!workshop) {
                    if (config.DEBUG) {
                        console.log("Attempted to retrieve workshop with id: " + id + "; no such workshop");
                    }
                    return null;
                }
                if (config.DEBUG) {
                    console.log("Retrieved workshop with id: " + id + "; it has title: " + workshop.title);
                }
                return { title: workshop.title, description: workshop.description };
            });
    }
}
