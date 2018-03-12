const Promise = require('bluebird');
const config = require('../config');
const workshopModel = require('../models/workshopModel');
const Schma = require('../models/schema');

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

    app.get('/test/work/', function(req, res) {
        var wshp = Schma.Workshop({title: "hello", description: "aaaaaathatssixas"});
        var usrOne = Schma.User({name: "One", workshop: wshp._id});
        var usrTwo = Schma.User({name: "Two", workshop: wshp._id});
        Promise.all([
            wshp.saveAsync(),
            usrOne.saveAsync(),
            usrTwo.saveAsync()
        ]).then(function(ret) {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write("created shit, id is: " + wshp.id);
            res.end();
            console.log(ret);
        });
    });

    app.get('/test/lau/:id', function(req, res) {
        Schma.Workshop.findByIdAsync({_id: req.params.id}).then(function(ret) {
            ret.findUsersAsync().then(function(ret) {
                res.write("hi");
                res.end();
                console.log(ret);
            });
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
