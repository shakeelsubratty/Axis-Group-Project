const mockery = require('mockery');
var expect = require('unexpected').clone()
    .use(require('unexpected-express'))
    .use(require('unexpected-sinon'));

describe('Idea APIs', function() {
    var app;

    before(function createAppAndMocks() {
        mockery.enable({warnOnUnregistered: false});
        mockery.registerMock('../models/ideaModel', {
            createIdea: function(ideaTitle, ideaDescription, userId) {
                return Promise.resolve(ideaTitle+ideaDescription+userId);
            }
        });
        mockery.registerSubstitute('../config', '../test/testConfig');
        app = require('express')();
        require('../routes/ideaRoutes')(app);
    });

    after(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#createIdea', function() {
        it('should return mocked idea when called with parameters', function() {
            expect(app, 'to yield exchange satisfying', {
                request: {
                    url: 'idea/create/123456789?title=test&description=idea'
                },
                response: {
                    statusCode: 200,
                    body: 'testidea123456789'
                }
            });
        });
    });
});
