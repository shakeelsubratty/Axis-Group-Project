const Promise = require('bluebird');
const config = require('../config');
const workshopModel = require('../models/workshopModel');
const Schma = require('../models/schema');

module.exports = function(app) {
    app.get(config.workshopRoot + '/create', function(req, res) {
        workshopModel.createWorkshop(req.query.title, req.query.description).then(function(newId) {
            if (config.DEBUG) {
                console.log("[API accessed] [workshopRoute] /create/:title/:description; created workshop with id: " + newId);
            }
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write(newId);
            res.end();
        });
    });

    app.get(config.workshopRoot + '/view/:id/users', function(req, res) {
        Schma.Workshop.findByIdAsync(req.params.id).then(function(workshop) {
            if (config.DEBUG) console.log("[API accessed] [workshopRoute] /view/:id/users; found workshop: " + workshop);
            if (workshop) {
                workshop.findUsersAsync().then(function(users) {
                    if (config.DEBUG) {
                        console.log("Found users in workshop:");
                        console.log(users);
                    }
                    res.json(users);
                });
            } else {
                res.sendStatus(404);
            }
        });
    });

    app.get(config.workshopRoot + '/view/:id/ideas', function(req, res) {
        Schma.Workshop.findByIdAsync(req.params.id).then(function(workshop) {
            if (config.DEBUG) console.log("[API accesssed] [workshopRoute] /view/:id/ideas; found workshop: " + workshop);
            if (workshop) {
                workshop.findUsersAsync().then(function(ideas) {
                    if (config.DEBUG) {
                        console.log("Found ideas in workshop:");
                        console.log(ideas);
                    }
                    res.json(ideas);
                });
            } else {
                res.sendStatus(404);
            }
        });
    });

    app.get(config.workshopRoot + '/view/:id', function(req, res) {
        workshopModel.getWorkshop(req.params.id).then(function(workshop) {
            if (workshop) {
                if (config.DEBUG) {
                    console.log("[API accessed] [workshopRoute] /view/:id; found workshop with title: " + workshop.title + " and description: " + workshop.description);
                }
                res.json(workshop);
            } else {
                if (config.DEBUG) {
                    console.log("Failed to retrieve workshop with id: " + req.params.id);
                }
                res.sendStatus(404);
            }
        });
    });
};
