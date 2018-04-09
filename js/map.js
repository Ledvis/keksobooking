'use strict';

(function() {
  // DOM elements
  let mapEl = document.querySelector('.map');
  let mapPinsListEl = mapEl.querySelector('.map__pins');
  let mapMainPinEl = mapEl.querySelector('.map__pin--main');
  let mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  const showOfferInfo = function(index) {
    let mapCard = mapEl.querySelector('.map__card');
    while (mapCard) {
      mapCard.remove();
      mapCard = false;
    }
    let newMapCard = window.popup.createMapCard(window.offer.offersList[index]);
    mapEl.appendChild(newMapCard);
    window.dialog(newMapCard);
  };

  const generatePins = function(data) {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      let newPin = mapPinTemplate.cloneNode(true);
      let newPinLeft = (data[i].location.x - window.consts.PIN_HALF_WIDTH) + 'px';
      let newPinTop = (data[i].location.y - window.consts.PIN_FULL_HEIGHT) + 'px';
      newPin.setAttribute('style', 'left: ' + newPinLeft + '; top: ' + newPinTop);
      newPin.querySelector('img').setAttribute('src', data[i].author.avatar);
      newPin.setAttribute('data-pin', i);
      fragment.appendChild(newPin);

      newPin.addEventListener('click', function(evt) {
        let newPinIndex = evt.currentTarget.getAttribute('data-pin');
        showOfferInfo(newPinIndex);
        newPin.classList.add('map__pin--active');
      });
    }

    mapPinsListEl.appendChild(fragment);
  };

  const activatePage = function() {
    mapEl.classList.remove('map--faded');
    window.form.enableForm();
    window.offer.generateOffers(window.consts.OFFERS_QUANTITY);
    generatePins(window.offer.offersList);
  };

  mapMainPinEl.addEventListener('click', activatePage);
})();
