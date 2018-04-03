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

  const getAvatar = function (min, max) {
    return avatarPath + window.util.getRandomNumber(min, max) + '.png';
  };

  let OFFERS = [];

  for (let i = 0; i < 8; i++) {
    OFFERS.push({
      author: {
        avatar: getAvatar(1, 8)
      },
      offer: {
        title: window.util.getRandomElement(OFFER_TITLES),
        address: window.util.getRandomNumber(300, 900) + ' ' + window.util.getRandomNumber(100, 500),
        price: window.util.getRandomNumber(1000, 1000000),
        type: window.util.getRandomElement(OFFER_TYPES),
        rooms: window.util.getRandomNumber(1, 5),
        guests: window.util.getRandomNumber(1, 10),
        checkin: window.util.getRandomElement(OFFER_CHECKINS),
        checkout: window.util.getRandomElement(OFFER_CHECHOUTS),
        photos: [],
        description: ''
      },
      location: {
        x: window.util.getRandomNumber(300, 900),
        y: window.util.getRandomNumber(100, 500)
      }
    });
  }

  const mapEl = document.querySelector('.map');

  mapEl.classList.remove('map--faded');
})();
