const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const config = require ('../config');
var Schma = require('./schema');
var Facilitator = Schma.Facilitator;

module.exports = {

    createFacilitator: function(user, pass) {
        return Facilitator({username: user, password: pass}).saveAsync().then(function(newUser) {
            return newUser.id;
        });
    },
    authenticate: function(user, pass) {
        return Facilitator.findOneAsync({username: user, password: pass}).then(function(authenticated) {
          return (authenticated) ? true : false;
        });
    }
}
