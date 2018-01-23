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

  const mapEl = document.querySelector('.map');
  const mapPinsListEl = document.querySelector('.map__pins');
  const mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  const mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  const avatarPath = 'img/avatars/user0';

  const getAvatar = function(min, max) {
    return avatarPath + window.util.getRandomNumber(min, max) + '.png';
  };

  var getRandomArray = function (arr, n) {
    let newArr = [];

    for (let i = 0; i < n; i++) {
      newArr.push(arr[i]);
    }

    return newArr;
  };

  let offers = [];
  const LOCATION_MIN_X = 300;
  const LOCATION_MAX_X = 900;
  const LOCATION_MIN_Y = 200;
  const LOCATION_MAX_Y = 500;
  const PRICE_MIN = 1000;
  const PRICE_MAX = 10000;
  const ROOMS_MIN = 1;
  const ROOMS_MAX = 5;
  const GUESTS_MIN = 5;
  const GUESTS_MAX = 5;
  const PIN_HALF_WIDTH = 25;
  const PIN_FULL_HEIGHT = 70;

  for (let i = 0; i < 8; i++) {
    offers.push({
      author: {
        avatar: getAvatar(1, 8)
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
        features: getRandomArray(OFFER_FEATURES, window.util.getRandomIndex(OFFER_FEATURES)),
        photos: getRandomArray(OFFER_PHOTOS, window.util.getRandomIndex(OFFER_PHOTOS)),
        description: ''
      },
      location: {
        x: window.util.getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X),
        y: window.util.getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y)
      }
    });
  }

  const createPins = function (data) {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      let newPin = mapPinTemplate.cloneNode(true);
      let newPinLeft = (data[i].location.x - PIN_HALF_WIDTH) + 'px';
      let newPinTop = (data[i].location.y - PIN_FULL_HEIGHT) + 'px';
      newPin.setAttribute('style', 'left: ' + newPinLeft + '; top: ' + newPinTop);
      newPin.querySelector('img').setAttribute('src', data[i].author.avatar);
      fragment.appendChild(newPin);
    }
    mapPinsListEl.appendChild(fragment);
  };

  createPins(offers);

  const createFeaturesList = function (data) {
    let featureItems = '';

    for (let i = 0; i < data.offer.features.length; i++) {
      featureItems += '<li class="feature feature--' + data.offer.features[i] + '"></li>';
    }

    return featureItems;
  };

  const createImagesList = function (data) {
    let images = '';

    for (let i = 0; i < data.offer.photos.length; i++) {
      images += '<li><img src="' + data.offer.photos[i] + '"></li>';
    }

    return images;
  };

  var createMapCard = function (card) {
    let newMapCard = mapCardTemplate.cloneNode(true);
    let mapCardAvatar = newMapCard.querySelector('.popup__avatar');
    let mapCardTitle = newMapCard.querySelector('h3');
    let mapCardPrice = newMapCard.querySelector('.popup__price');
    let mapCardType = newMapCard.querySelector('h4');
    let mapCardAccommodation = newMapCard.querySelector('.popup__accommodation');
    let mapCardSchedule = newMapCard.querySelector('.popup__schedule');
    let mapCardFeatures = newMapCard.querySelector('.popup__features');
    let mapCardPictures = newMapCard.querySelector('.popup__pictures');

    mapCardAvatar.setAttribute('src', card.author.avatar);
    mapCardTitle.innerHTML = card.offer.title;
    mapCardPrice.innerHTML = card.offer.price + ' &#x20bd;/ночь';
    mapCardType.innerHTML = card.offer.type;
    mapCardAccommodation.innerHTML = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    mapCardSchedule.innerHTML = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    mapCardFeatures.innerHTML = createFeaturesList(offers[0]);
    mapCardPictures.innerHTML = createImagesList(offers[0]);
    mapEl.appendChild(newMapCard);
  };

  createMapCard(offers[0]);

  mapEl.classList.remove('map--faded');
})();
