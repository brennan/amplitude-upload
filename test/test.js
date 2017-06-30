"use strict";

var Amplitude = require("../index.js");
var fixtures = require("./fixtures/index.js");
var expect = require("chai").expect;
var should = require("chai").should();


var amplitude = new Amplitude("YOUR_API_KEY");

describe("Amplitude Upload", function() {

  describe("`identify` event", function() {
    it("should send Segment identify events", function(done) {
      amplitude.post(fixtures.identify, function(err, res) {
        if (err) {
          console.log(err);
        }
        expect(res).to.equal("success");
        done();
      });
    });
  });

  describe("`track` event", function() {
    it("should send Segment track events", function(done) {
      amplitude.post(fixtures.track, function(err, res) {
        if (err) {
          console.log(err);
        }
        expect(res).to.equal("success");
        done();
      });
    });
  });

  describe("Common errors", function() {

    it("should throw an error if no event type or an unsupported type is sent", function(done) {
      var event = fixtures.unsupportedType;
      amplitude.post(event, function(err, res) {
        should.exist(err);
        done();
      });
    });

    it("should throw an error if neither userId nor deviceId is included", function(done) {
      var event = fixtures.noIdentifiers;
      amplitude.post(event, function(err, res){
        should.exist(err);
        done();
      });
    });
  });

});
