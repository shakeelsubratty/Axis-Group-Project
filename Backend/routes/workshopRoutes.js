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
};
