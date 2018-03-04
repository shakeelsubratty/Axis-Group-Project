const Promise = require('bluebird');
const config = require('../config');
const participantModel = require('../models/participantModel');

module.exports = function(app) {
    app.get(config.participantRoot + '/create/:name', function(req, res) {
        participantModel.createParticipant(req.params.name).then(function(newId) {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write("New user created, id is: " + newId);
            res.end();
        });
    });

    app.get(config.participantRoot + '/view/:id', function(req, res) {
        participantModel.getParticipantName(req.params.id).then(function(name) {
            res.writeHead(200, {"Content-Type": "text/plain"});
            if (name) {
                res.write("User found with name: " + name);
            } else {
                console.log("Failed to retrieve participant with id: " + req.params.id);
                res.write("No participant with this id");
            }
            res.end();
        });
    });
};
