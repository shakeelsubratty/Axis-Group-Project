var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require('mongoose'));

var workshopSchema = mongoose.Schema({
    title: String,
    description: String
});
workshopSchema.methods.findUsersAsync = function() {
    return userModel.findAsync({workshop: this._id});
};
workshopSchema.methods.findIdeasAsync = function() {
    return ideaModel.findAsync({workshop: this._id});
};

var userSchema = mongoose.Schema({
    name: String,
    workshop: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop' }
});
userSchema.methods.findIdeasAsync = function() {
    return ideaModel.findAsync({user: this._id});
}

var ideaSchema = mongoose.Schema({
    title: String,
    description: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    workshop: { type: mongoose.Schema.Types.ObjectId, ref: 'Workshop' }
});

var facilitatorSchema = mongoose.Schema({
    username: String,
    password: String
});

var workshopModel = mongoose.model('Workshop', workshopSchema);
var userModel = mongoose.model('User', userSchema);
var ideaModel = mongoose.model('Idea', ideaSchema);
var facilitatorModel = mongoose.model('Facilitator', facilitatorSchema);

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
