'use strict';

(function() {
  const closePopup = function(element) {
    element.setAttribute('style', 'display: none');
  };

  window.dialog = function(window) {
    let popupWindow = window;
    let popupCloseEl = popupWindow.querySelector('.popup__close');

    popupCloseEl.addEventListener('click', function() {
      closePopup(popupWindow);
    });
  };
})();
