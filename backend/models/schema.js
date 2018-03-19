/**
 * schema, provides required mongodb models and schema's for the
 * backend data storage.
 */

//Application requirements
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));

//Schema of a workshop
var workshopSchema = mongoose.Schema({
    title: String, //Title (question) of a workshop
    description: String //Further information for a workshop
});

//Workshop method, get the users of a workshop
workshopSchema.methods.findUsersAsync = function() {
    return userModel.findAsync({workshop: this._id}); //Returns users in workshop
};

//Workshop method, get ideas in a workshop
workshopSchema.methods.findIdeasAsync = function() {
    return ideaModel.findAsync({workshop: this._id}); //Returns ideas in workshop
};

//Schema of a user (participant)
var userSchema = mongoose.Schema({
    name: String, //A provided placeholder name for the user

    //The workshop object that they are a part of
    workshop: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop' }
});

//User method, find all ideas that a user has provided to a workshop
userSchema.methods.findIdeasAsync = function() {
    return ideaModel.findAsync({user: this._id}); //Return the user's ideas
}

//Schema of an idea
var ideaSchema = mongoose.Schema({
    title: String, //Title of the idea
    description: String, //Further information provided about the idea

    //Object of the user that provided the idea
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    //Object of the workshop that the idea was provided in
    workshop: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop' }
});

//Schema of a facilitator
var facilitatorSchema = mongoose.Schema({
    username: String, //The username of the facilitator
    password: String //The password of the facilitator
});

/**
 * Define models for all of the schemas
 */
var workshopModel = mongoose.model('Workshop', workshopSchema);
var userModel = mongoose.model('User', userSchema);
var ideaModel = mongoose.model('Idea', ideaSchema);
var facilitatorModel = mongoose.model('Facilitator', facilitatorSchema);

/**
 * Schema export values, defines what to return if value is requested.
 * e.g. schema.Workshop - Returns the workshop model to carry out functions on.
 */
module.exports = {
    WorkshopSchema: workshopSchema,
    UserSchema: userSchema,
    IdeaSchema: ideaSchema,
    FacilitatorSchema: facilitatorSchema,
    Workshop: workshopModel,
    User: userModel,
    Idea: ideaModel,
    Facilitator: facilitatorModel
}
