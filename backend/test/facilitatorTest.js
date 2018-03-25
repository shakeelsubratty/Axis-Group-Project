const mockery = require('mockery');
var expect = require('unexpected').clone()
    .use(require('unexpected-express'))
    .use(require('unexpected-sinon'));

describe('Facilitator APIs', function() {
    var app;

    before(function createAppAndMocks() {
        mockery.enable({warnOnUnregistered: false});
        mockery.registerMock('../models/authModel', {
            createFacilitator: function(user, pass) {
                return Promise.resolve(user+pass);
            },
            authenticate: function(user, pass) {
              return Promise.resolve((user=="facilitator1" && pass=="password1") ? true : false);
            }
        });
        mockery.registerSubstitute('../config', '../test/testConfig');
        app = require('express')();
        require('../routes/authRoutes')(app);
    });

    after(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#createFacilitator', function() {
        it('should return mocked ID when called with parameters', function() {
            expect(app, 'to yield exchange satisfying', {
                request: {
                    url: 'auth/create/testuser/testpassword'
                },
                response: {
                    statusCode: 200,
                    body: 'testusertestpassword'
                }
            });
        });
    });

    describe('#authenticate', function() {
        it('should return true when called with correct parameters', function() {
            expect(app, 'to yield exchange satisfying', {
                request: {
                    url: 'auth/login/facilitator1/password1'
                },
                response: {
                    statusCode: 200,
                    body: 'true'
                }
            });
        });
    });
});
