'use strict';

(function () {
  const avatarPath = 'img/avatars/user0';
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

  const getAvatar = function(min, max) {
    return avatarPath + window.util.getRandomNumber(min, max) + '.png';
  };

  const mapEl = document.querySelector('.map');
  const mapPinsListEl = document.querySelector('.map__pins');
  const mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  const mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  var getRandomArray = function (arr, n) {
    let newArr = [];

    for (let i = 0; i < n; i++) {
      newArr.push(arr[i]);
    }

    return newArr;
  };

  let offers = [];

  for (let i = 0; i < 8; i++) {
    offers.push({
      author: {
        avatar: getAvatar(1, 8)
      },
      offer: {
        title: window.util.getRandomElement(OFFER_TITLES),
        address: window.util.getRandomNumber(300, 900) + ' ' + window.util.getRandomNumber(100, 500),
        price: window.util.getRandomNumber(1000, 10000),
        type: window.util.getRandomElement(OFFER_TYPES),
        rooms: window.util.getRandomNumber(1, 5),
        guests: window.util.getRandomNumber(1, 8),
        checkin: window.util.getRandomElement(OFFER_CHECKINS),
        checkout: window.util.getRandomElement(OFFER_CHECHOUTS),
        features: getRandomArray(OFFER_FEATURES, window.util.getRandomIndex(OFFER_FEATURES)),
        photos: [],
        description: ''
      },
      location: {
        x: window.util.getRandomNumber(300, 900),
        y: window.util.getRandomNumber(200, 500)
      }
    });
  }

  const createPins = function (data) {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      let newPin = mapPinTemplate.cloneNode(true);
      let newPinLeft = data[i].location.x - 25 + 'px';
      let newPinTop = data[i].location.y - 70 + 'px';
      newPin.setAttribute('style', 'left: ' + newPinLeft + '; top: ' + newPinTop);
      newPin.querySelector('img').setAttribute('src', data[i].author.avatar);
      fragment.appendChild(newPin);
    }
    mapPinsListEl.appendChild(fragment);
  };

  const createFeaturesList = function (data) {
    let featureList;
    debugger;

    for (let i = 0; i < data.offer.features.length; i++) {
      featureList = '<li>Hello</li>';
    }

    return featureList;
  };

  createPins(offers);

  var createMapCard = function (card) {
    let newMapCard = mapCardTemplate.cloneNode(true);
    let mapCardAvatar = newMapCard.querySelector('.popup__avatar');
    let mapCardTitle = newMapCard.querySelector('h3');
    let mapCardPrice = newMapCard.querySelector('.popup__price');
    let mapCardType = newMapCard.querySelector('h4');
    let mapCardAccommodation = newMapCard.querySelector('.popup__accommodation');
    let mapCardSchedule = newMapCard.querySelector('.popup__schedule');
    let mapCardFeatures = newMapCard.querySelector('.popup__features');

    mapCardAvatar.setAttribute('src', card.author.avatar);
    mapCardTitle.innerHTML = card.offer.title;
    mapCardPrice.innerHTML = card.offer.price + ' &#x20bd;/ночь';
    mapCardType.innerHTML = card.offer.type;
    mapCardAccommodation.innerHTML = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    mapCardSchedule.innerHTML = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    mapCardFeatures.innerHTML = createFeaturesList(offers[0]);
    mapEl.appendChild(newMapCard);
  };

  createMapCard(offers[0]);

  mapEl.classList.remove('map--faded');
})();
