'use strict';

(function() {
  const mapEl = document.querySelector('.map');
  const mapCardTemplate = mapEl.querySelector('template').content.querySelector('.map__card');
  const mapFiltersEl = mapEl.querySelector('.map__filters-container');

  const deleteOfferInfo = function(pin) {
    let activatePin = pin;
    activatePin.classList.remove('popup__pin--active');
    window.map.clearOfferInfo();
  };

  const renderPopup = function(card) {
    let offerCard = mapCardTemplate.cloneNode(true);

    offerCard.querySelector('.popup__title').textContent = card.offer.title;
    offerCard.querySelector('.popup__address').textContent = card.offer.adress;
    offerCard.querySelector('.popup__price').textContent = card.offer.price;
    offerCard.querySelector('.popup__type').textContent = card.offer.type;
    offerCard.querySelector('.popup__description').textContent = card.offer.description;
    offerCard.querySelector('.popup__accommodation').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';

    document.mapEl.insertBefore(offerCard, mapFiltersEl);
  };

  window.showCard = {
    renderPopup: renderPopup
  };
})();
