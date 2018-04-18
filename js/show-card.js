'use strict';

(function() {
  const mapFiltersEl = document.querySelector('.map__filters-container');
  const mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  const photoDimension = {
    WIDTH: 70,
    HEIGHT: 70
  };

  const getFeatures = function(data) {
    let features = document.createDocumentFragment();

    data.forEach(function(item) {
      let feature = document.createElement('li');
      feature.classList.add('feature', 'feature--' + item);
      features.appendChild(feature);
    });

    return features;
  };

  const getPhotos = function(data) {
    let photos = document.createDocumentFragment();

    data.forEach(function(item) {
      let photoItem = document.createElement('li');
      let photoImg = document.createElement('img');

      photoImg.src = item;
      photoImg.width = photoDimension.WIDTH;
      photoImg.height = photoDimension.HEIGHT;
      photoItem.appendChild(photoImg);
      photos.appendChild(photoItem);
    });

    return photos;
  };

  const pluralizeRooms = function(roomsNumber) {
    switch (roomsNumber) {
      case 1:
        return roomsNumber + ' комната для ';
      case 0:
      case 5:
        return roomsNumber + ' комнат для ';
      default:
        return roomsNumber + ' комнаты для ';
    }
  };

  const pluralizeGuests = function(guestsNumber) {
    switch (guestsNumber) {
      case 0:
      case 1:
        return guestsNumber + ' гостя';
      default:
        return guestsNumber + ' гостей';
    }
  };

  const closePopup = function() {
    let popup = document.querySelector('.map__card');

    if (popup) {
      popup.parentNode.removeChild(popup);
    }

    document.removeEventListener('keydown', cardEscKeydownHandler);
  };

  const cardCloseClickHandler = function() {
    closePopup();
  };

  const cardCloseKeydownHandler = function(evt) {
    window.util.isEnterEvent(evt, closePopup);
  };

  const cardEscKeydownHandler = function(evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  const renderPopup = function(card) {
    closePopup();

    let offerCard = mapCardTemplate.cloneNode(true);

    offerCard.querySelector('.popup__title').textContent = card.offer.title;
    offerCard.querySelector('.popup__address').textContent = card.offer.adress;
    offerCard.querySelector('.popup__price').textContent = card.offer.price + ' \u20BD/ночь';
    offerCard.querySelector('.popup__type').textContent = card.offer.type;
    offerCard.querySelector('.popup__description').textContent = card.offer.description;
    offerCard.querySelector('.popup__accommodation').textContent = pluralizeRooms(card.offer.rooms) + pluralizeGuests(card.offer.guests);
    offerCard.querySelector('.popup__schedule').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    offerCard.querySelector('.popup__avatar').src = card.author.avatar;

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

    // Render pictures
    const photosList = offerCard.querySelector('.popup__pictures');

    if (card.offer.photos !== 0) {
      while (photosList.firstChild) {
        photosList.removeChild(photosList.firstChild);
      }
      photosList.appendChild(getPhotos(card.offer.photos));
    }

    // Insert card in DOM
    document.querySelector('.map').insertBefore(offerCard, mapFiltersEl);

    // Click end keydown events handlers on popup card
    const cardCloseEl = offerCard.querySelector('.popup__close');

    cardCloseEl.addEventListener('click', cardCloseClickHandler);
    cardCloseEl.addEventListener('keydown', cardCloseKeydownHandler);

    // ESC keydown handler
    document.addEventListener('keydown', cardEscKeydownHandler);
  };

  window.showCard = {
    renderPopup: renderPopup
  };
})();
