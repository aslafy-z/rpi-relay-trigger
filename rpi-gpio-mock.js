function Gpio() {
  this.setup = function(channel, direction, edge, onSetup) {
    console.log('mock.setup(' + channel + ', ' + direction + ', ' + edge + ')');
    onSetup();
  };
  this.write = this.output = function(channel, value, cb) {
    console.log('mock.write(' + channel + ', ' + value + ')');
    cb();
  };
  this.read = this.input = function(channel, cb) {
    console.log('mock.read(' + channel + ')');
    cb();
  };
  this.destroy = function(cb) {
    console.log('mock.destroy()');
    cb();
  };
  this.reset = function() {
    console.log('mock.reset()');
  };
}

var GPIO = new Gpio();

// Promise
GPIO.promise = {
  /**
   * @see {@link Gpio.setup}
   * @param channel
   * @param direction
   * @param edge
   * @returns {Promise}
   */
  setup: function(channel, direction, edge) {
    return new Promise(function(resolve, reject) {
      function done(error) {
        if (error) return reject(error);
        resolve();
      }

      GPIO.setup(channel, direction, edge, done);
    });
  },

  /**
   * @see {@link Gpio.write}
   * @param channel
   * @param value
   * @returns {Promise}
   */
  write: function(channel, value) {
    return new Promise(function(resolve, reject) {
      function done(error) {
        if (error) return reject(error);
        resolve();
      }

      GPIO.write(channel, value, done);
    });
  },

  /**
   * @see {@link Gpio.read}
   * @param channel
   * @returns {Promise}
   */
  read: function(channel) {
    return new Promise(function(resolve, reject) {
      function done(error, result) {
        if (error) return reject(error);
        resolve(result);
      }

      GPIO.read(channel, done);
    });
  },

  /**
   * @see {@link Gpio.destroy}
   * @returns {Promise}
   */
  destroy: function() {
    return new Promise(function(resolve, reject) {
      function done(error) {
        if (error) return reject(error);
        resolve();
      }

      GPIO.destroy(done);
    });
  },
};

module.exports = GPIO;
