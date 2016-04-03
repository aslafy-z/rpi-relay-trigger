/* adapted from https://github.com/Kylir/rgb-slider */

var express = require('express');
var gpio = require('rpi-gpio');
var path = require('path');
var app = express();

var RED_GPIO_PIN = 11;
var GREEN_GPIO_PIN = 12;
var BLUE_GPIO_PIN = 15;

gpio.setup(RED_GPIO_PIN, gpio.DIR_OUT, gpio.EDGE_NONE, pinSet(RED_GPIO_PIN));
gpio.setup(GREEN_GPIO_PIN, gpio.DIR_OUT, gpio.EDGE_NONE, pinSet(GREEN_GPIO_PIN));
gpio.setup(BLUE_GPIO_PIN, gpio.DIR_OUT, gpio.EDGE_NONE, pinSet(BLUE_GPIO_PIN));


function pinSet(pinID) {
    console.log('Setup to pin' + pinID);
}


//Serve public content - basically any file in the public folder will be available on the server.
app.use(express.static(path.join(__dirname, 'public')));

//We also need 3 services - Red, Green and Blue.
// Each section is doing exactly the same but for a particular color.

app.get('/red/:value', function (req, res) {
    console.log("red = " + req.params.value);
    var redValue = req.params.value;
    if( !isNaN( parseInt(redValue) ) ){
      if (redValue === "1") {
        gpio.write(RED_GPIO_PIN, true, function(err) {
            if (err) throw err;
        });
        res.send('ok');
      }
      else {
        gpio.write(RED_GPIO_PIN, false, function(err) {
            if (err) throw err;
        });
        res.send('ok');
      }
    } else {
        res.status(400).send('error');
    }
});

app.get('/green/:value', function (req, res) {
    console.log("green = " + req.params.value);
    var greenValue = req.params.value;
    if( !isNaN( parseInt(greenValue) ) ){
      if (greenValue === "1") {
        gpio.write(GREEN_GPIO_PIN, true, function(err) {
            if (err) throw err;
        });
        res.send('ok');
      }
      else {
        gpio.write(GREEN_GPIO_PIN, false, function(err) {
            if (err) throw err;
        });
        res.send('ok');
      }
    } else {
        res.status(400).send('error');
    }
});

app.get('/blue/:value', function (req, res) {
    console.log("blue = " + req.params.value);
    var blueValue = req.params.value;
    if( !isNaN( parseInt(blueValue) ) ){
        if (blueValue === "1") {
          gpio.write(BLUE_GPIO_PIN, true, function(err) {
              if (err) throw err;
          });
          res.send('ok');
        }
        else {
          gpio.write(BLUE_GPIO_PIN, false, function(err) {
              if (err) throw err;
          });
          res.send('ok');
        }
    } else {
        res.status(400).send('error');
    }
});

// Start listening on port 3000.
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('RGB LED Toggle listening at http://%s:%s', host, port);
});
