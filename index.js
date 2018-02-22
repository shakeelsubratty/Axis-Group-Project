var http = require("http");
var mongoose = require('mongoose');
const url = `mongodb://${process.env.DB_PORT_27017_TCP_ADDR}:${process.env.DB_PORT_27017_TCP_PORT}/app`
mongoose.connect(url);

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
});//*/

http.createServer(function(request, response) {
    var idea = Idea.find({user:"me"});
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Here are the ideas:\n");
    Idea.find({byUser: "me"}, function(err, ideas) {
        if (err) {
            response.write("ERROR: " + err);
            return;
        }
        ideas.forEach(function(idea) {
            response.write(idea.text + "\n");
        });
        response.end();
    });
}).listen(3000);
