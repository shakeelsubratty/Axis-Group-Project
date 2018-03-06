const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const config = require ('../config');
//const uuid = require('uuid/v1');

var participantSchema = mongoose.Schema({
    //_id: {type: String, default: uuid},
    name: String
});
var Participant = mongoose.model("participant", participantSchema);

module.exports = {
    createParticipant: function(participantName) {
        return Participant({name: participantName}).saveAsync().then(function(newParticipant) {
            if (config.DEBUG) {
                console.log("Created participant with name: " + newParticipant.name + "; and id: " + newParticipant._id);
            }
            return newParticipant._id;
        });

    },
    getParticipantName: function(id) {
        return Participant.findOneAsync({'_id': id})
            .then(function(participant) {
                if (!participant) {
                    if (config.DEBUG) {
                        console.log("Attempted to retrieve participant with id: " + id + "; no such participant");
                    }
                    return null;
                }
                if (config.DEBUG) {
                    console.log("Retrieved participant with id: " + id + "; it has name: " + participant.name);
                }
                return participant.name;
            });
    }
}
