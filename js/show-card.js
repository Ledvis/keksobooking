'use strict';

(function() {
  const mapFiltersEl = document.querySelector('.map__filters-container');
  const mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  const getFeatures = function(data) {
    let features = document.createDocumentFragment();

    data.forEach(function(item) {
      let feature = document.createElement('li');
      feature.classList.add('feature', 'feature--' + item);
      features.appendChild(feature);
    });

    return features;
  };

  const closePopup = function() {
    let popup = document.querySelector('.map__card');

    if (popup) {
      popup.parentNode.removeChild(popup);
    }
  };

  const cardCloseClickHandler = function() {
    closePopup();
  };

  const cardCloseKeydownHandler = function(evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  const renderPopup = function(card) {
    closePopup();

    let offerCard = mapCardTemplate.cloneNode(true);

    offerCard.querySelector('.popup__title').textContent = card.offer.title;
    offerCard.querySelector('.popup__address').textContent = card.offer.adress;
    offerCard.querySelector('.popup__price').textContent = card.offer.price;
    offerCard.querySelector('.popup__type').textContent = card.offer.type;
    offerCard.querySelector('.popup__description').textContent = card.offer.description;
    offerCard.querySelector('.popup__accommodation').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';

    // Render features
    const featuresList = offerCard.querySelector('.popup__features');

    if (card.offer.features.length !== 0) {
      while (featuresList.firstChild) {
        featuresList.removeChild(featuresList.firstChild);
      }
      featuresList.appendChild(getFeatures(card.offer.features));
    } else {
      featuresList.parentNode.removeChild(featuresList);
    }

    // Insert card in DOM
    document.querySelector('.map').insertBefore(offerCard, mapFiltersEl);

    // Click end keydown events handlers on popup card
    const cardCloseEl = offerCard.querySelector('.popup__close');

    cardCloseEl.addEventListener('click', cardCloseClickHandler);
    cardCloseEl.addEventListener('keydown', cardCloseKeydownHandler);
  };

  window.showCard = {
    renderPopup: renderPopup
  };
})();
