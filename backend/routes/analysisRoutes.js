const Promise = require ('bluebird');
const config = require ('../config');
const analysisModel = require ('../models/analysisModel');
const request = require('request');

module.exports = function(app) {
    app.get(config.analysisRoot + '/userengagement/:workshopId', function(req, res) {
        analysisModel.getUsersAndIdeaText(req.params.workshopId).then(function(ret) {
            if (config.DEBUG) {
                console.log("[API accessed] [analysisRoute] /userengagement/:workshopId, currently aggregated the following user data: " + JSON.stringify(ret));
            }
            /*********TODO: remove mock and reinstate proper API call***********/
            // var mockRet = {
            //     superUnengaged: 0.2,
            //     unengaged: 0.3,
            //     engaged: 0.4,
            //     superEngaged: 0.1,
            //     overallEngagement: 0.6
            // };
            // res.json(mockRet);

            request.post(
                config.aiUrl + "/analysis/userengagement",
                //{json: {myKey: "myValue"}},
                {json: ret},
                function(error, response, body) {
                    if (config.DEBUG) {
                        console.log("[AI request made] userengagement, received error: " + error + "; and response: " + response + "; and body: " + body);
                    }
                    res.json(body);
                }
            );
        });
    });

    app.get(config.analysisRoot + '/wordcloud/:workshopId', function(req, res) {
        analysisModel.getUsersAndIdeaText(req.params.workshopId).then(function(ret) {
            if (config.DEBUG) {
                console.log("[API accessed] [analysisRoute] /wordcloud/:workshopId, currently aggregated the following user data: " + JSON.stringify(ret));
            }
            var mockRet = [
                { "name": "Potato", "count": 1, "colour": "#00ff00", "sentiment": 1 },
                { "name": "Ireland", "count": 1, "colour": "#ff0000", "sentiment": -1 },
                { "name": "Manuel", "count": 1, "colour": "#f0f000", "sentiment": 0.5 },
                { "name": "Alex", "count": 2, "colour": "#0f0f00", "sentiment": -0.8 }
            ];
            res.json(mockRet);
        });
    });
}
