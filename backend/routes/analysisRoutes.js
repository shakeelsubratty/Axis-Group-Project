const Promise = require ('bluebird');
const config = require ('../config');
const analysisModel = require ('../models/analysisModel');
const request = require('request');

module.exports = function(app) {
    app.get(config.analysisRoot + '/userengagement/:workshopId', function(req, res) {
        analysisModel.getUsersAndIdeaText(req.params.workshopId).then(function(ret) {
            if (config.DEBUG) {
                console.log("[API accessed] [analysisRoute] /userengagement/:workshopId, got the following engagement: " + JSON.stringify(ret));
            }
            /*********TODO: remove mock and reinstate proper API call***********/
            var mockRet = {
                superUnengaged: 0.2,
                unengaged: 0.3,
                engaged: 0.4,
                superEngaged: 0.1,
                overallEngagement: 0.6
            };
            res.json(mockRet);
            /*
            request.post(
                config.aiUrl + "/analysis/userengagement",
                {json: {myKey: "myValue"}},
                function(error, response, body) {
                    if (config.DEBUG) {
                        console.log("[AI request made] userengagement, received error: " + error + "; and response: " + response + "; and body: " + body);
                    }
                    res.json(body);
                }
            );*/
        });
    });
}
