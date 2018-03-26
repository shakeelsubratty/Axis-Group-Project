const mockery = require('mockery');
var expect = require('unexpected').clone()
    .use(require('unexpected-express'))
    .use(require('unexpected-sinon'));

describe('Workshop APIs', function() {
    var app;

    before(function createAppAndMocks() {
        mockery.enable({warnOnUnregistered: false});
        mockery.registerMock('../models/schema', {
          Workshop: {
            findByIdAsync: function() {
              var ret = {
                findIdeasAsync: function() {
                  return Promise.resolve({idea: "This is my idea"});
                },
                findUsersAsync: function() {
                  return Promise.resolve({user: "user001"})
                }
              };
              return Promise.resolve(ret);
            }
          }
        });
        mockery.registerMock('../models/workshopModel', {
          createWorkshop: function(workshopTitle, workshopDescription) {
            return Promise.resolve(workshopTitle+workshopDescription);
          },
          activateWorkshop: function(workshopID) {
            return Promise.resolve(workshopID);
          },
          getWorkshop: function(workshopID) {
            return Promise.resolve({title: "This is a title", description: "This is the description"});
          }
        });
        mockery.registerSubstitute('../config', '../test/testConfig');
        app = require('express')();
        require('../routes/workshopRoutes')(app);
    });

    after(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#createWorkshop', function() {
        it('should return mocked workshop title and description when called with correct parameters', function() {
            expect(app, 'to yield exchange satisfying', {
                request: {
                    url: 'workshop/create?title=hello&description=testworkshop'
                },
                response: {
                    statusCode: 200,
                    body: 'hellotestworkshop'
                }
            });
        });
    });

    describe('#activateWorkshop', function() {
        it('should return OK when called with parameters', function() {
            expect(app, 'to yield exchange satisfying', {
                request: {
                    url: 'workshop/set/12345679/active'
                },
                response: {
                    statusCode: 200,
                    body: 'OK'
                }
            });
        });
    });

    describe('#getWorkshop', function() {
        it('should return workshop when called with parameters', function() {
            expect(app, 'to yield exchange satisfying', {
                request: {
                    url: 'workshop/view/123456789'
                },
                response: {
                    statusCode: 200,
                    body: '{"title":"This is a title","description":"This is the description"}'
                }
            });
        });
    });

    describe('#viewIdeas', function() {
        it('should return json encoded idea when called with parameters', function() {
            expect(app, 'to yield exchange satisfying', {
                request: {
                    url: 'workshop/view/123456789/ideas'
                },
                response: {
                    statusCode: 200,
                    body: '{"idea":"This is my idea"}'
                }
            });
        });
    });

    describe('#viewUsers', function() {
        it('should return users in workshop when called with parameters', function() {
            expect(app, 'to yield exchange satisfying', {
                request: {
                    url: 'workshop/view/123456789/users'
                },
                response: {
                    statusCode: 200,
                    body: '{"user":"user001"}'
                }
            });
        });
    });
});
