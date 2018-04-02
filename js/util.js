'use strict';

(function () {
  window.util = {
    getRandomItem: function (array) {
      return Math.floor(Math.random() * array.length);
    }
  };
})();
