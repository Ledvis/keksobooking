'use strict';

(function() {
  const deleteOfferInfo = function(pin) {
    let activatePin = pin;
    activatePin.classList.remove('popup__pin--active');
    window.map.clearOfferInfo();
  };

  const showCardInfo = function(index, pin) {
    window.map.clearOfferInfo();
    let mapCard = window.popup.createMapCard(window.data.offersList[index]);
    let mapCardCloseEl = mapCard.querySelector('.popup__close');
    mapCardCloseEl.addEventListener('click', function() {
      deleteOfferInfo(pin);
    });
    return mapCard;
  };

  window.showCard = {
    showCardInfo: showCardInfo
  };
})();
