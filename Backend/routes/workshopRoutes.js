const Promise = require('bluebird');
const config = require('../config');
const workshopModel = require('../models/workshopModel');

module.exports = function(app) {
    app.get(config.workshopRoot + '/create/:type/:description', function(req, res) {
        workshopModel.createWorkshop(req.params.type, req.params.description).then(function(newId) {
            if (config.DEBUG) {
                console.log("[API accessed] [workshopRoute] /create/:type/:description; created workshop with id: " + newId);
            }
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write(newId.toString());
            res.end();
        });
    });

    app.get(config.workshopRoot + '/view/:id', function(req, res) {
        workshopModel.getWorkshopDescription(req.params.id).then(function(description) {
            res.writeHead(200, {"Content-Type": "text/plain"});
            if (description) {
                if (config.DEBUG) {
                    console.log("[API accessed] [workshopRoute] /view/:id; found workshop with description: " + description);
                }
                res.write(description);
            } else {
                if (config.DEBUG) {
                    console.log("Failed to retrieve workshop with id: " + req.params.id);
                }
            }
            res.end();
        });
    });
};
