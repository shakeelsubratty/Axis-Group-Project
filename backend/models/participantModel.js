const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const config = require ('../config');
var Schma = require('./schema');
var User = Schma.User;

module.exports = {
    createParticipant: function(workshopId) {
        return User({workshop: workshopId}).saveAsync().then(function(newUser) {
            if (config.DEBUG) {
                console.log("Created participant with name: " + newUser.name + "; and id: " + newUser._id + "; attached to workshop: " + newUser.workshop);
            }
            return newUser.id;
        });

    },
}
