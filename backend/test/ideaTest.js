const mockery = require('mockery');
const Promise = require('bluebird');
var expect = require('unexpected').clone()
    .use(require('unexpected-express'))
    .use(require('unexpected-sinon'));

describe('Idea APIs', function() {
    var app;

    before(function createAppAndMocks() {
        mockery.enable({warnOnUnregistered: false, useCleanCache: true});
        mockery.registerMock('../models/ideaModel', {
            createIdea: function(ideaTitle, ideaDescription, userID) {
                ret = {
                    updateAsync: function(body) {
                        return Promise.resolve("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAA");
                    },
                    id: "abcd123"
                };
                return Promise.resolve(ret);
            },
            deleteIdea: function(ideaID) {}
        });
        mockery.registerMock('request', {
            post: function(url, data, callback) {
                callback();
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
        it('should return mocked idea title, description and user userid when called with parameters', function() {
            expect(app, 'to yield exchange satisfying', {
                request: {
                    url: 'idea/create/123456789?title=test&description=idea'
                },
                response: {
                    statusCode: 200,
                    body: 'abcd123'
                }
            });
        });
    });

    describe('#deleteIdea', function() {
        it('should return OK when deleting a valid idea', function() {
            expect(app, 'to yield exchange satisfying', {
                request: {
                    url: 'idea/delete/123456789'
                },
                response: {
                    statusCode: 200
                }
            });
        });
    });
});
