/* adapted from https://github.com/watkinspd/rgb-toggle */

const sleep = require('sleep-promise');
const lock = new (require('node-async-locks')).AsyncLock();
const path = require('path');
const express = require('express');
const isRpi = require('detect-rpi');
const app = express();

let gpio;
if (isRpi()) {
  gpio = require('rpi-gpio').promise;
} else {
  gpio = require('./rpi-gpio-mock').promise;
  console.log('Not running on a raspberry pi, using gpio mocks');
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

const PORT = process.env.PORT || 3000;
const GPIO_PINS = (process.env.GPIO_PINS || '7,11')
  .split(',')
  .map((num) => parseInt(num, 10));

// tooling
const range = (n) => [...Array.from(Array(n).keys())];

// Async locked events tooling
function fire_order(order) {
  lock.enter(launch.bind(null, order));
}
function launch(order, token) {
  order().then(() => token.leave());
}

// GPIO sequences tooling
function trigger(on = true) {
  return Promise.all(GPIO_PINS.map((pin) => gpio.write(pin, !on)));
}
function sequence(interval) {
  return trigger(true)
    .then(() => sleep(interval))
    .then(() => trigger(false));
}
function shutdown() {
  gpio.destroy().then(() => {
    process.exit(0);
  });
}

// Serve public content
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/blink', (req, res) => {
  const interval = parseInt(req.query.interval || '1000', 10);
  const duration = parseInt(req.query.duration || '2', 10);

  function the_order() {
    let promise = Promise.resolve().catch((err) => app.emit('failure', err));
    for (const idx in range(duration)) {
      promise = promise.then(() => sequence(interval));
      if (idx + 1 < duration) {
        promise = promise.then(() => sleep(interval));
      }
    }
    return promise;
  }

  fire_order(the_order);
  res.send('OK');
});

app.on('gpio-ready', () => app.emit('ready'));
app.on('gpio-failure', (err) => app.emit('failure', err));

app.on('ready', () => {
  console.log('Pins have been initialized');

  app.listen(PORT, () => {
    console.log('Listening on :' + PORT);
  });
});

app.on('failure', (err) => {
  console.error(err);
  process.exit(1);
});

// Setup GPIO pins
Promise.resolve()
  .then(() =>
    Promise.all(GPIO_PINS.map((pin) => gpio.setup(pin, gpio.DIR_OUT))),
  )
  .then(() => sleep(3000))
  .then(() => trigger(false))
  .then(() => app.emit('gpio-ready'))
  .catch((err) => app.emit('gpio-failure', err));
