'use strict';

(function() {
  let mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  const generateFeaturesList = function(data) {
    let featuresList = '';

    for (let i = 0; i < data.offer.features.length; i++) {
      featuresList += '<li class="feature feature--' + data.offer.features[i] + '"></li>';
    }

    return featuresList;
  };

  const createMapCard = function(card) {
    let newMapCard = mapCardTemplate.cloneNode(true);
    let mapCardAvatar = newMapCard.querySelector('.popup__avatar');
    let mapCardTitle = newMapCard.querySelector('h3');
    let mapCardPrice = newMapCard.querySelector('.popup__price');
    let mapCardType = newMapCard.querySelector('h4');
    let mapCardAccommodation = newMapCard.querySelector('.popup__accommodation');
    let mapCardSchedule = newMapCard.querySelector('.popup__schedule');
    let mapCardFeatures = newMapCard.querySelector('.popup__features');
    let mapCardPicturesList = newMapCard.querySelector('.popup__pictures');

    mapCardAvatar.setAttribute('src', card.author.avatar);
    mapCardTitle.innerHTML = card.offer.title;
    mapCardPrice.innerHTML = card.offer.price + ' &#x20bd;/ночь';
    mapCardType.innerHTML = card.offer.type;
    mapCardAccommodation.innerHTML = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    mapCardSchedule.innerHTML = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    mapCardFeatures.innerHTML = generateFeaturesList(window.offer.offersList[0]);

    for (let i = 0; i < card.offer.photos.length; i++) {
      let mapCartPictureEl = mapCardPicturesList.querySelector('li').cloneNode(true);
      let mapCartPicture = mapCartPictureEl.querySelector('img');
      mapCartPicture.setAttribute('src', card.offer.photos[i]);
      mapCartPicture.width = '70';
      mapCartPicture.height = '70';
      mapCardPicturesList.appendChild(mapCartPictureEl);
    }

    mapCardPicturesList.removeChild(mapCardPicturesList.firstElementChild);

    return newMapCard;
  };

  window.popup = {
    createMapCard: createMapCard
  };
})();
