'use strict';

(function () {
  window.util = {
    getRandomIndex: function(arr) {
      return Math.floor(Math.random() * arr.length);
    },
    getRandomElement: function(arr) {
      return arr[this.getRandomIndex(arr)];
    },
    getRandomNumber: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  };
})();
