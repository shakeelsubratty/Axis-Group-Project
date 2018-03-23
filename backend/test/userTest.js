const mockery = require('mockery');
var expect = require('unexpected').clone()
    .use(require('unexpected-express'))
    .use(require('unexpected-sinon'));

describe('User APIs', function() {
    var app;

    before(function createAppAndMocks() {
        mockery.enable({warnOnUnregistered: false});
        mockery.registerMock('../models/participantModel', {
            createParticipant: function(workshop) {
                console.log("ran mock lol");
                return Promise.resolve(true).then(function() { return workshop });
            }
        });
        mockery.registerSubstitute('../config', '../test/testConfig');
        app = require('express')();
        require('../routes/participantRoutes')(app);
    });

    after(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#createParticipant', function() {
        it('should return mocked ID when called with parameters', function() {
            expect(app, 'to yield exchange satisfying', {
                request: {
                    url: 'participant/create/hello'
                },
                response: {
                    statusCode: 200,
                    body: 'hello'
                }
            });
        });
    });
});
