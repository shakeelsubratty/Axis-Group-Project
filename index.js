var mongoose = require('mongoose');
var express = require('express');
var Promise = require('bluebird');
var _ = require('lodash');
const url = `mongodb://${process.env.DB_PORT_27017_TCP_ADDR}:${process.env.DB_PORT_27017_TCP_PORT}/app`
mongoose.connect(url);

var app = express();

var db = mongoose.connection;
var connected = "not yet connected";
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    connected = "Connected to mongo successfully!";
});

var ideaSchema = mongoose.Schema({
    byUser: String,
    timestamp: {type: Date, default: Date.now },
    text: String,
    avgTypingSpeed: Number,
    backtrackedAmount: Number,
    timeNotTyping: Number //time AFTER typing started, during which nothing was typed - presumably time spent thinking
});

var Idea = mongoose.model("Idea", ideaSchema);
/********* Uncomment this to add two ideas to the database next time you start **********\
\*********  the server then comment it back or else it will keep adding them   **********/
/*
var test = new Idea({byUser: 'me', text: 'this is gay'});
test.save(function(err, idea){
    if (err) return console.error(err);
});
var test2 = new Idea({byUser: 'you', text: 'no u'});
test2.save(function(err, idea) {
    if (err) return console.error(err);
});//*/

findAsync = Promise.promisify(Idea.find); //should probably be something like mongoose.model.prototype.find or whatever

app.get('/', function(request, response) {
    var idea = Idea.find({user:"me"});
    var printIdeas = function(ideas) {
        if (!ideas.length) {
            return response.write("[Placeholder - no data]");
        }
        _.each(ideas, function(idea) {
            response.write(idea.text + "\n");
        });
    };
    response.writeHead(200, {"Content-Type": "text/plain"});
    Promise.all(
        [
            findAsync.call(Idea, {byUser: 'me'}),
            findAsync.call(Idea, {byUser: 'you'})
        ]
    ).then(function(ideaSets) {
        response.write("Here are my ideas:\n");
        printIdeas(ideaSets[0]);
        response.write("And here are yours:\n");
        printIdeas(ideaSets[1]);
    })
    .catch(function(err) {
        response.write("ERROR: " + err);
    }).finally(function() {
        response.end();
    });
});

app.get('/newIdea/:byuser/', function(req, res) {
    Idea({byUser: req.params.byuser, text: req.query.text}).save(function(err, idea) {
        if (err) return res.sendStatus(500);
        else res.sendStatus(200);
    });
});

app.listen(3000, function(){console.log("App started on port 3000");});
