var mongoose = require('mongoose');
var express = require('express');
var Promise = require('bluebird');
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
        ideas.forEach(function(idea) {
            response.write(idea.text + "\n");
        });
    };
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Here are my ideas:\n");
    /*tasks = [];
    tasks.push(findAsync(Idea, {byUser: 'you'}));
    tasks.push(findAsync(Idea, {byUser: 'me'}));//*/
    //*
    Promise.all(
        [
            findAsync.call(Idea, {byUser: 'you'}),
            findAsync.call(Idea, {byUser: 'me'})
        ]
    ).then(function(ideaSets) {
        console.log("FOUNF");
    });//*/
    /*
    findAsync
        .call(Idea, {byUser: 'me'})
        .then(printIdeas)
        .then(function() {
            findAsync
                .call(Idea, {byUser: 'you'})
                .then(printIdeas)
                .catch(function(err) {
                    response.write("ERROR: " + err);
                }).finally(function() {
                    response.end();
                })
            }
        
    );//*/
    /*
    Idea.find({byUser: "me"}, function(err, ideas) {
        if (err) {
            response.write("ERROR: " + err);
            return;
        }
        ideas.forEach(function(idea) {
            response.write(idea.text + "\n");
        });
    });
    response.write("Here are your ideas:\n");
    Idea.find({byUser: "you"}, function(err, ideas) {
        if (err) {
            response.write("ERROR: " + err);
            return;
        }
        ideas.forEach(function(idea) {
            response.write(idea.text + "\n");
        });
    });//*/
});

app.listen(3000, function(){console.log("App started on port 3000");});
