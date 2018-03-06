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
    }
}
