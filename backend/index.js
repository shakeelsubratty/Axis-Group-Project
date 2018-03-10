const mongoose = require('mongoose');
const express = require('express');
const Promise = require('bluebird');
const _ = require('lodash');
const participantModel = require('./models/participantModel');
const workshopModel = require('./models/workshopModel');
var config = require('./config');
mongoose.connect(config.mongoUrl);
var app = express();

const participantRoutes = require('./routes/participantRoutes')(app);
const workshopRoutes = require('./routes/workshopRoutes')(app);

var db = mongoose.connection;
var connected = "not yet connected";
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    connected = "Connected to mongo successfully!";
});


app.get('/', function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<h>Welcome to Backend</h><p>This is a placeholder homepage</p>");
    res.end();
});

app.listen(3000, function(){console.log("App started on port 3000");});
