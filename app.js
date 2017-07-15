"use strict";

var Amplitude = require("./index.js");
var data = require("./events.json");
var amplitude = new Amplitude("YOUR_API_KEY");

for (var i = 0; i < data.length; i++) {

  amplitude.post(data[i], function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });

}
