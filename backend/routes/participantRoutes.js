const Promise = require('bluebird');
const config = require('../config');
const participantModel = require('../models/participantModel');
const Schma = require('../models/schema');

module.exports = function(app) {
    app.get(config.participantRoot + '/create/:workshop', function(req, res) {
        participantModel.createParticipant(req.params.workshop).then(function(newId) {
            if (config.DEBUG) {
                console.log("[API accessed] [participantRoute] /create/:workshop; created user with id: " + newId);
            }
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write(newId);
            res.end();
        });
    });

    app.get(config.participantRoot + '/view/:id/ideas', function(req, res) {
        Schma.User.findByIdAsync(req.params.id).then(function(user) {
            if (config.DEBUG) {
                console.log("[API accessed] [participantRoute] /view/:id; found user: " + user);
            }
            if (user) {
                user.findIdeasAsync().then(function(ideas) {
                    if (config.DEBUG) {
                        console.log("Found ideas for user:");
                        console.log(ideas);
                    }
                    res.json(ideas);
                });
            } else {
                res.sendStatus(404);
            }
        });
    });
};
