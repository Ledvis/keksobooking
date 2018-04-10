'use strict';

(function() {
  // DOM elements
  let mapEl = document.querySelector('.map');
  let mapPinsListEl = mapEl.querySelector('.map__pins');
  let mapMainPinEl = mapEl.querySelector('.map__pin--main');
  let mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  const hideOfferInfo = function() {
    let mapCard = mapEl.querySelector('.map__card');
    if (mapCard) {
      mapCard.parentNode.removeChild(mapCard);
      mapEl.removeEventListener('keydown', popUpEscHandler);
    }
  };

  const showOfferInfo = function(index) {
    hideOfferInfo();
    let mapCard = window.popup.createMapCard(window.offer.offersList[index]);
    let mapCardCloseEl = mapCard.querySelector('.popup__close');
    mapCardCloseEl.addEventListener('click', hideOfferInfo);
    mapEl.appendChild(mapCard);
  };

  const mapClickHandler = function(evt) {
    let clickedEl = evt.target;
    if (!clickedEl.hasAttribute('data-pin')) {
      clickedEl = clickedEl.parentNode;
    }

    let clickedIndex = clickedEl.getAttribute('data-pin');
    if (clickedIndex) {
      showOfferInfo(clickedIndex);
      clickedEl.classList.add('.popup__pin--active');
    }
  };

  const popUpEscHandler = function(evt) {
    window.util.isEscEvent(evt, hideOfferInfo);
  };

  mapEl.addEventListener('click', mapClickHandler, true);
  mapEl.addEventListener('keydown', popUpEscHandler, true);

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
