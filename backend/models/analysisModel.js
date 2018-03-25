const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const config = require ('../config');
const schema = require ('./schema');

module.exports = {
    getUsersAndIdeaText: function(workshopId) {
        return schema.Workshop.findByIdAsync(workshopId).then(function(workshop) {
            return workshop.findUsersAsync();
        }).then(function(users) {
            return Promise.reduce(
                users.map(user => user._id),
                function(acc, el) {
                    return schema.User.findByIdAsync(el).then(function(user) {
                        return user.findIdeasAsync();
                    }).then(function(ideas) {
                        acc.push({
                            id: el,
                            responses: ideas.map(function(idea) {
                                return {
                                    id: idea._id,
                                    description: idea.description
                                };
                            })
                        });
                        return acc;
                    })
                },
                [] //the initial value
            );
        });
    }
}
