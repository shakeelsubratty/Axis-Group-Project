const mockery = require('mockery');
var expect = require('unexpected').clone()
    .use(require('unexpected-express'))
    .use(require('unexpected-sinon'));

describe('User APIs', function() {
    var app;

    before(function createAppAndMocks() {
        mockery.enable({warnOnUnregistered: false});
        mockery.registerMock('../models/schema', {
          User: {
            findByIdAsync: function() {
              var ret = {
                findIdeasAsync: function() {
                  return Promise.resolve({title: "Test idea", description: "Test description", user: "user01", workshop: "workshop01"});
                }
              };
              return Promise.resolve(ret);
            }
          }
        });
        mockery.registerMock('../models/participantModel', {
            createParticipant: function(workshop) {
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

      describe('#viewParticipantIdeas', function() {
          it('should return mocked ID when called with parameters', function() {
              expect(app, 'to yield exchange satisfying', {
                  request: {
                      url: 'participant/view/123456789/ideas'
                  },
                  response: {
                      statusCode: 200,
                      body: '{"title":"Test idea","description":"Test description","user":"user01","workshop":"workshop01"}'
                  }
              });
          });
      });
});
