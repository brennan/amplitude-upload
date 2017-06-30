"use strict";

var identifyFixture = require("./identify.json");
var trackFixture = require("./track.json");
var noIdFixture = require("./track-no-id.json")
var unsupportedTypeFixture = require("./event-no-type.json")

var fixtures = {
  identify: identifyFixture,
  track: trackFixture,
  noIdentifiers: noIdFixture,
  unsupportedType: unsupportedTypeFixture
}

module.exports = fixtures;
