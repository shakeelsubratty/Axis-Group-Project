const mockery = require('mockery');
var expect = require('unexpected').clone()
    .use(require('unexpected-express'))
    .use(require('unexpected-sinon'));

describe('Workshop APIs', function() {
    var app;

    before(function createAppAndMocks() {
        mockery.enable({warnOnUnregistered: false});
        mockery.registerMock('../models/workshopModel', {
          createWorkshop: function(workshopTitle, workshopDescription) {
            return Promise.resolve(workshopTitle+workshopDescription);
          },
          activateWorkshop: function(workshopID) {
            return Promise.resolve(workshopID);
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
        it('should return mocked ID when called with parameters', function() {
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
});
