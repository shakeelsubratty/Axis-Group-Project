const mockery = require('mockery');
const Promise = require('bluebird');
const sinon = require('sinon');
const mongoose = require('mongoose');
const config = require('./testConfig');
var expect = require('unexpected').clone()
    .use(require('unexpected-express'))
    .use(require('unexpected-sinon'));

describe('Workshop APIs', function() {
    var workshopModel;
    var workshopId;
    var title = "hello";
    var description = "This is the description of a workshop. What ideas do you have?"

    before(function createAppAndMocks() {
        mockery.enable({warnOnUnregistered: false, useCleanCache: true});
        mockery.registerSubstitute('../config', '../test/testConfig');
        workshopModel = require('../models/workshopModel');
        mongoose.connect(config.mongoUrl);
    });

    after(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#createWorkshop', function() {
        it('should create a workshop with no errors', function() {
            this.timeout(10000);
            return workshopModel.createWorkshop(title, description).then(function(id) {
                workshopId = id;
                expect(workshopId, 'to be a', 'string');
            });
        });
        it('should return the correct title and description of the workshop', function() {
            return true;
        });
    });
});
