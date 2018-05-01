'use strict';

(function() {
  const keyCode = {
    ESC: 27,
    ENTER: 13
  };
  const DEBOUNCE_INTERVAL = 500; // ms
  let lastTimeout;

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
    getRandomArr: function(arr, n) {
      let newArr = [];
      let originalArr = arr.slice();

      for (let i = 0; i < n; i++) {
        let randomIndex = window.util.getRandomIndex(originalArr);
        newArr.push(originalArr[randomIndex]);
        originalArr.splice(randomIndex, 1);
      }

      return newArr;
    },
    isEscEvent: function(evt, action) {
      if (evt.keyCode === keyCode.ESC) {
        action();
      }
    },
    isEnterEvent: function(evt, action) {
      if (evt.keyCode === keyCode.ENTER) {
        action();
      }
    },
    debounce: function(fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    }
  };
})();
