/**
 * Index.js, specify initial requirements and components for backend application.
 * Returns holding page if directly accessed.
 */

// Application requirements
const mongoose = require('mongoose');
const express = require('express');
const Promise = require('bluebird');
var config = require('./config');

var recursiveConnect = function() {
    return mongoose.connect(config.mongoUrl, function(err) {
        if (err) {
            console.log("Connect failed! Retrying in 2 seconds...");
            setTimeout(recursiveConnect, 2000);
        }
    });
}
recursiveConnect();

var app = express(); //Define express application

var db = mongoose.connection;
var connected = "not yet connected";

db.on('error', console.error.bind(console, 'connection error:'));

//Attempt to open a connection
db.once('open', function() {
    if (config.DEBUG) { console.log ("Connected to mongo successfully!") };
    //Define API routes
    require('./routes/participantRoutes')(app);
    require('./routes/workshopRoutes')(app);
    require('./routes/ideaRoutes')(app);
    require('./routes/authRoutes')(app);
    require('./routes/analysisRoutes')(app);
});

//Return required headers for the API access
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Return placeholder on direct access to index.js
app.get('/', function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<h>Welcome to Backend</h><p>This is a placeholder homepage</p>");
    res.end();
});

//Start application to listen on provided port
app.listen(3000, function(){console.log("App started on port 3000");});
