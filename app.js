"use strict";

var Amplitude = require("./index.js");
var data = require("./events.json");
var amplitude = new Amplitude("60d7d1cc0bd78f57b7362b70f12bd5b3");

for (var i = 0; i < data.length; i++) {

  amplitude.post(data[i], function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });

}
