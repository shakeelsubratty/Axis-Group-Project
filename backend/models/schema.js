var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));

var workshopSchema = mongoose.Schema({
    title: String,
    description: String,
});

var userSchema = mongoose.Schema({
    name: String,
    workshop: { Schema.Types.ObjectId, ref: 'Workshop' }
});

var ideaSchema = mongoose.Schema({
    title: String
    description: String
    user: { Schema.Types.ObjectId, ref: 'User' },
    workshop: {Schema.Types.ObjectId, ref: 'Workshop' },
});
