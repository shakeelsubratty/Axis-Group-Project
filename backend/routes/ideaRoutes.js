const Promise = require('bluebird');
const config = require('../config');
const ideaModel = require('../models/ideaModel');
const Schma = require('../models/schema');

module.exports = function(app) {
    app.get(config.ideaRoot + '/create/:userId', function(req, res) {
        ideaModel.createIdea(req.query.title, req.query.description, req.params.userId).then(function(newId) {
            if (config.DEBUG) {
                console.log("[API accessed] [ideaRoute] /create/:userId, created user with id: " + newId);
            }
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write(newId);
            res.end();
        });
    });
    app.get(config.ideaRoot + '/delete/:id', function(req, res) {
        ideaModel.deleteIdea(req.query.id);
        res.sendStatus(200);
    });
}
