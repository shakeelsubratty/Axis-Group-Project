const mockery = require('mockery');
const Promise = require('bluebird');
const sinon = require('sinon');
var expect = require('unexpected').clone()
    .use(require('unexpected-express'))
    .use(require('unexpected-sinon'));

describe('Workshop APIs', function() {
    var workshopModel;

    before(function createAppAndMocks() {
        var mockgoose = Promise.promisifyAll(require('mongoose'));
        console.log(mockgoose.Document.prototype);
        var stubSave = sinon.stub(mockgoose, 'Document.prototype.saveAsync');
        var fakeSave = function() {
            console.log(JSON.stringify(this));
            return Promise.resolve("123");
        }
        stubSave.callsFake(fakeSave);
        mockery.enable({warnOnUnregistered: false, useCleanCache: true});
        mockery.registerMock('mongoose', mockgoose);
        mockery.registerSubstitute('../config', '../test/testConfig');
        workshopModel = require('../models/workshopModel');
    });

    after(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#createWorkshop', function() {
        it('should return mocked workshop title and description when called with correct parameters', function() {
            Workshop({title: workshopTitle, description: workshopDescription}).saveAsync()
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            return true;
        });
    });
});
