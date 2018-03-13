const mongoose = require('mongoose');
const express = require('express');
const Promise = require('bluebird');
const _ = require('lodash');
var config = require('./config');
mongoose.connect(config.mongoUrl);
var app = express();

require('./routes/participantRoutes')(app);
require('./routes/workshopRoutes')(app);

var db = mongoose.connection;
var connected = "not yet connected";
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    connected = "Connected to mongo successfully!";
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("<h>Welcome to Backend</h><p>This is a placeholder homepage</p>");
    res.end();
});

app.listen(3000, function(){console.log("App started on port 3000");});
