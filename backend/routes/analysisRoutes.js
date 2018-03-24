const Promise = require ('bluebird');
const config = require ('../config');
const analysisModel = require ('../models/analysisModel');

module.exports = function(app) {
    app.get(config.analysisRoot + '/userengagement/:workshopId', function(req, res) {
        analysisModel.getUsersAndIdeaText(req.params.workshopId).then(function(ret) {
            if (config.DEBUG) {
                console.log("[API accessed] [analysisRoute] /userengagement/:workshopId, got the following engagement: " + ret);
            }
            res.json(ret);
        });
    });
}
