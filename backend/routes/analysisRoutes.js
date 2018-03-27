const Promise = require ('bluebird');
const config = require ('../config');
const analysisModel = require ('../models/analysisModel');
const request = require('request');

module.exports = function(app) {
    app.get(config.analysisRoot + '/userengagement/:workshopId', function(req, res) {
        analysisModel.getUsersAndIdeaText(req.params.workshopId).then(function(ret) {
            if(ret == []) {
              res.json("[0, 0, 0, 0, 0]");
              return;
            }
            if (config.DEBUG) {
                console.log("[API accessed] [analysisRoute] /userengagement/:workshopId, currently aggregated the following user data: " + JSON.stringify(ret));
            }
            /*********TODO: remove mock and reinstate proper API call***********/
            request.post(
                config.aiUrl + "/userengagement",
                //{json: {myKey: "myValue"}},
                {json: ret},
                function(error, response, body) {
                    if (config.DEBUG) {
                      console.log("[AI request made] userengagement, received error: " + error + "; and response: " + JSON.stringify(response) + "; and body: " + JSON.stringify(body));
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
<<<<<<< HEAD
            var mockRet = [
                { "value": "Potato", "count": 1, "color": "#00ff00"},
                { "value": "Ireland", "count": 1, "color": "#ff0000"},
                { "value": "Manuel", "count": 1, "color": "#f0f000"},
                { "value": "Alex", "count": 2, "color": "#0f0f00"}
            ];
            res.json(mockRet);
        });
    });
=======
            request.post(
                config.aiUrl + "/wordcloud",
                {json: ret},
                function(error, response, body) {
                    if (config.DEBUG) {
                        console.log("[AI request made] wordcloud, received error: " + error + "; and response: " + JSON.stringify(response) + "; and body: " + JSON.stringify(body));
                    }
                    res.json(body);
                }
            );
        });
    });

>>>>>>> 407385696cf0e3861d3ffb3a901f15aabd8873c1
}
