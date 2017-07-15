"use strict";

var request = require("request");
var encode = require("urlencode");
var time = require("unix-time");
var find = require("obj-case");

var Amplitude = function(apiKey) {
  this.apiKey = apiKey;
};

Amplitude.prototype.post = function(data, fn) {
  var payload = [];
  var event = {};
  var metadata = {};

  if (!data.context.device.id && !data.userId) return fn(new Error("A deviceId or userId is required."));

  // common required properties
  event.device_id = find(data, "context.device.id");
  event.user_id = find(data, "context.userId");

  // common fields
  event.app_version = find(data, "context.app.version");
  event.platform = find(data, "context.device.type");
  event.os_name = find(data, "context.os.name");
  event.os_version = find(data, "context.os.version");
  event.device_brand = find(data, "context.device.manufacturer");
  event.device_model = find(data, "context.device.model");
  event.carrier = find(data, "context.network.carrier");
  event.country = find(data, "context.location.country");
  event.city = find(data, "context.location.city");
  event.language = find(data, "context.locale");
  event.location_lat = find(data, "context.location.latitude");

  if (data.timestamp) {
    var date = time(data.timestamp);
    event.time = date;
  }

  if (data.type == "identify") {
    event.user_traits = find(data, "traits");

    // event metadata for post to Amplitude
    metadata.baseEndpoint = "https://api.amplitude.com/identify?api_key=" + this.apiKey;
    metadata.querystring = "&identification=";

    payload.push(event);

  } else if (data.type == "track") {
    event.insert_id = data.messageId; // prevent dupes in Amplitude
    event.event_type = data.event;
    event.user_properties = data.properties;

    // ecommerce properties
    event.price = find(data, "price");
    event.revenue = find(data, "revenue");
    event.quantity = find(data, "quantity");
    event.productId = find(data, "product_id");

    // event metadata for post to Amplitude
    metadata.baseEndpoint = "https://api.amplitude.com/httpapi?api_key=" + this.apiKey;
    metadata.querystring = "&event=";

    payload.push(event);

  } else {
    return fn(new Error("Error: This script only accepts events of type `identify` or `track`"));

  }

  var querystring = metadata.querystring + encode(JSON.stringify(payload));

  var options = {
    method: "POST",
    uri: metadata.baseEndpoint + querystring
  };

  request(options, function(err, res, body) {
    if (err) fn(new Error(err));
    if (res.body !== 'success') fn(new Error(res.body));
    fn(null, res.body);
    }
  );

};

module.exports = Amplitude;
