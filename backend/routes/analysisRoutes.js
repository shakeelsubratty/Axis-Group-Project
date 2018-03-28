const Promise = require ('bluebird');
const config = require ('../config');
const analysisModel = require ('../models/analysisModel');
const request = require('request');

module.exports = function(app) {
    app.get(config.analysisRoot + '/userengagement/:workshopId', function(req, res) {
        analysisModel.getUsersAndIdeaText(req.params.workshopId).then(function(ret) {
            if(!Array.isArray(ret) || !ret.length) {
              res.json([0, 0, 0, 0, 0]);
              return;
            }
            if (config.DEBUG) {
                console.log("[API accessed] [analysisRoute] /userengagement/:workshopId, currently aggregated the following user data: " + ret);
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
               request.post(
                   config.aiUrl + "/wordcloud",
                   {json: ret},
                   function(error, response, body) {
                       if (config.DEBUG) {
                           console.log("[AI request made] wordcloud, received error: " + error + "; and response: " + JSON.stringify(response) + "; and body: " + JSON.stringify(body));
                       }
                       var clouds = body.map(function(cloud) {
                           return {
                               value: cloud.name,
                               count: cloud.count,
                               color: cloud.colour
                           };
                       });
                       res.json(clouds);
                   }
               );
           });
       });
}
