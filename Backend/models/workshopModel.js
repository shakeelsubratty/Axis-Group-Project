const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const config = require ('../config');
//const uuid = require('uuid/v1');

var workshopSchema = mongoose.Schema({
    //_id: {type: String, default: uuid},
    id: String,
    type: String,
    description: String
});
var Workshop = mongoose.model("workshop", workshopSchema);

module.exports = {
    createWorkshop: function(workshopType, workshopDescription) {
        return Workshop({type: workshopType, description: workshopDescription}).saveAsync().then(function(newWorkshop) {
            if (config.DEBUG) {
                console.log("Created workshop with type: " + newWorkshop.type + "; and description: " + newWorkshop.description);
            }
            return newWorkshop._id;
        });
    },
    getWorkshopDescription: function(id) {
        return Workshop.findOneAsync({'_id': id})
            .then(function(workshop) {
                if (!workshop) {
                    if (config.DEBUG) {
                        console.log("Attempted to retrieve workshop with id: " + id + "; no such workshop");
                    }
                    return null;
                }
                if (config.DEBUG) {
                    console.log("Retrieved workshop with id: " + id + "; it has description: " + workshop.description);
                }
                return workshop.description;
            });
    }
}
