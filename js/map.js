'use strict';

(function () {
  const OFFER_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало поколено в воде',
  ];
  const OFFER_TYPES = [
    'flat',
    'house',
    'bungalo'
  ];
  const OFFER_CHECKINS = [
    '12:00',
    '13:00',
    '14:00'
  ];
  const OFFER_CHECHOUTS = [
    '12:00',
    '13:00',
    '14:00'
  ];
  const OFFER_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  const OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  const OFFERS_QUANTITY = 8;
  const AVATAR_PATH = 'img/avatars/user';
  const LOCATION_MIN_X = 300;
  const LOCATION_MAX_X = 900;
  const LOCATION_MIN_Y = 200;
  const LOCATION_MAX_Y = 500;
  const PRICE_MIN = 1000;
  const PRICE_MAX = 10000;
  const ROOMS_MIN = 1;
  const ROOMS_MAX = 5;
  const GUESTS_MIN = 1;
  const GUESTS_MAX = 5;
  const PIN_HALF_WIDTH = 25;
  const PIN_FULL_HEIGHT = 70;

  // DOM elements
  let mapEl = document.querySelector('.map');
  let mapPinsListEl = mapEl.querySelector('.map__pins');
  let mapTemplate = document.querySelector('template');
  let mapPinTemplate = mapTemplate.content.querySelector('.map__pin');
  let mapCardTemplate = mapTemplate.content.querySelector('.map__card');
  let formEl = document.querySelector('.notice__form');
  let mapMainPinEl = mapEl.querySelector('.map__pin--main');
  let fieldsetEls = formEl.querySelectorAll('fieldset');
  let offers = [];

  const getAvatar = function (avatarId) {
    let avatarIndex = avatarId + 1;

    return avatarIndex = AVATAR_PATH + '0' + avatarIndex + '.png';
  };

  const generateOffers = function (count) {
    for (let i = 0; i < count; i++) {
      offers.push({
        author: {
          avatar: getAvatar(i)
        },
        offer: {
          title: window.util.getRandomElement(OFFER_TITLES),
          address: window.util.getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X) + ' ' + window.util.getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y),
          price: window.util.getRandomNumber(PRICE_MIN, PRICE_MAX),
          type: window.util.getRandomElement(OFFER_TYPES),
          rooms: window.util.getRandomNumber(ROOMS_MIN, ROOMS_MAX),
          guests: window.util.getRandomNumber(GUESTS_MIN, GUESTS_MAX),
          checkin: window.util.getRandomElement(OFFER_CHECKINS),
          checkout: window.util.getRandomElement(OFFER_CHECHOUTS),
          features: window.util.getRandomArr(OFFER_FEATURES, window.util.getRandomIndex(OFFER_FEATURES)),
          photos: window.util.getRandomArr(OFFER_PHOTOS, OFFER_PHOTOS.length),
          description: ''
        },
        location: {
          x: window.util.getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X),
          y: window.util.getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y)
        }
      });
    }
  };

  const showOfferInfo = function(index) {
    createMapCard(offers[index]);
  };

  const generatePins = function (data) {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      let newPin = mapPinTemplate.cloneNode(true);
      let newPinLeft = (data[i].location.x - PIN_HALF_WIDTH) + 'px';
      let newPinTop = (data[i].location.y - PIN_FULL_HEIGHT) + 'px';
      newPin.setAttribute('style', 'left: ' + newPinLeft + '; top: ' + newPinTop);
      newPin.querySelector('img').setAttribute('src', data[i].author.avatar);
      newPin.setAttribute('data-pin', i);
      fragment.appendChild(newPin);

      newPin.addEventListener('click', function (evt) {
        let newPinIndex = evt.target.parentNode.getAttribute('data-pin');
        showOfferInfo(newPinIndex);
        newPin.classList.add('map__pin--active');
      });
    }

    mapPinsListEl.appendChild(fragment);
  };

  const generateFeaturesList = function (data) {
    let featuresList = '';

    for (let i = 0; i < data.offer.features.length; i++) {
      featuresList += '<li class="feature feature--' + data.offer.features[i] + '"></li>';
    }

    return featuresList;
  };

  const createMapCard = function (card) {
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
    mapCardFeatures.innerHTML = generateFeaturesList(offers[0]);

    for (let i = 0; i < card.offer.photos.length; i++) {
      let mapCartPictureEl = mapCardPicturesList.querySelector('li').cloneNode(true);
      let mapCartPicture = mapCartPictureEl.querySelector('img');
      mapCartPicture.setAttribute('src', card.offer.photos[i]);
      mapCartPicture.width = '70';
      mapCartPicture.height = '70';
      mapCardPicturesList.appendChild(mapCartPictureEl);
    }

    mapCardPicturesList.removeChild(mapCardPicturesList.firstElementChild);

    mapEl.appendChild(newMapCard);
  };

  const enableForm = function() {
    formEl.classList.remove('notice__form--disabled');
    let fieldsetEl;

    for (let i = 0; i < fieldsetEls.length; i++) {
      fieldsetEl = fieldsetEls[i];
      fieldsetEl.removeAttribute('disabled');
    }
  };

  const activatePage = function() {
    mapEl.classList.remove('map--faded');
    enableForm();
    generateOffers(OFFERS_QUANTITY);
    generatePins(offers);
  };

  mapMainPinEl.addEventListener('click', activatePage);
})();
