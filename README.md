## About Amplitude Upload

Simple node program that transforms and uploads raw Segment `track` and `identify` events to Amplitude's API.

## Installation

```
$ git clone https://github.com/brennan/amplitude-upload
$ cd amplitude-upload
$ npm install
```

### Usage

This program is ready to use out of the box. Open `app.js` in your text editor to get started:


```
var Amplitude = require("./index.js");
var amplitude = new Amplitude("YOUR_API_KEY");
var data = require("./events.json");

for (var i = 0; i < data.length; i++) {

  amplitude.send(data[i], function(err, res) {
    if (err) console.log(err);
    else console.log(res);
  });

}
```

Add your JSON to `events.json`, then type `node app.js` in the command line to begin upload. Simply remove the `for` loop if you only want to send a single event.

### Restrictions

Events must be of Segment type `track` or `identify`.

Events must include either a `userId` or `deviceId`. You don't need to pass both if they aren't needed.

### Mapping

```
Amplitude Property: Segment Property

// common required properties
event.device_id: data.context.device.id
event.user_id: data.context.userId

// common fields
event.app_version: data.context.app.version
event.platform: data.context.device.type
event.os_name: data.context.os.name
event.os_version: data.context.os.version
event.device_brand: data.context.device.manufacturer
event.device_model: data.context.device.model
event.carrier: data.context.network.carrier
event.country: data.context.location.country
event.city: data.context.location.city
event.language: data.context.locale
event.location_lat: data.context.location.latitude
event.time: data.timestamp

// properties unique to identify events
event.user_traits = data.traits;

// properties unique to track events
event.insert_id: data.messageId
event.event_type: data.event
event.user_properties: data.properties
event.price: data.price
event.revenue: data.revenue
event.quantity: data.quantity
event.productId: data.product_id
```

### Testing

Add your Amplitude API key to the `test.js` file in the `test` folder:

```
var amplitude = new Amplitude("YOUR_API_KEY");
```

Then, run your tests:

```
npm test
```

Check out the full test suite in the project `test` directory.
