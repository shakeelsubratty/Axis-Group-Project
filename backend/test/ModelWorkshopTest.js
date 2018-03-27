const mockery = require('mockery');
var expect = require('unexpected').clone()
    .use(require('unexpected-express'))
    .use(require('unexpected-sinon'));

describe('Workshop APIs', function() {
  const workshopModel = require('../models/workshopModel');
  var app;

    before(function createAppAndMocks() {
        mockery.enable({warnOnUnregistered: false});
        mockery.registerMock('mongoose', {
          saveAsync: function() {
            return Promise.resolve("123");
          },
        });
        mockery.registerSubstitute('../config', '../test/testConfig');
        app = require('express')();
    });

    after(function() {
        mockery.deregisterAll();
        mockery.disable();
    });

    describe('#createWorkshop', function() {
        it('should return mocked workshop title and description when called with correct parameters', function() {
          expect(app, 'to yield exchange satisfying', {
              request: {
                  workshopModel.createWorkshop()
              },
              response: {
                  statusCode: 200,
                  body: 'hellotestworkshop'
              }
          });
        });
    });
});
