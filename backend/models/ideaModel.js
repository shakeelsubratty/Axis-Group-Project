const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const config = require('../config');
const Schma = require('./schema');
const Idea = Schma.Idea;

module.exports = {
    createIdea: function(ideaTitle, ideaDescription, userId) {
        return Schma.User.findByIdAsync(userId).then(function(user) {
            var workshopId = user.workshop;
            return Idea({title: ideaTitle, description: ideaDescription, user: userId, workshop: workshopId}).saveAsync();
        }).then(function(newIdea) {
            if (config.DEBUG) {
                console.log("Created idea with title: " + newIdea.title + " for user: " + newIdea.user);
            }
            return newIdea.id;
        });
    },
    viewIdea: function(id) {
        if (config.DEBUG) {
            console.log("accessing idea wiht ID: " + id);
            Schma.Idea.findByIdAsync(id).then(function(ret){console.log(ret);});
        }
        return Schma.Idea.findByIdAsync(id);
    },
    deleteIdea: function(id) {
        if (config.DEBUG) {
            console.log("deleting ideas with ID: " + id);
            Schma.Idea.findAsync({_id: id}).then(function(ret){console.log(ret);});
        }
        return Schma.Idea.remove({_id: id});
    }
}
