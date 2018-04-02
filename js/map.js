'use strict';

(function () {
  const avatarPath = 'img/avatars/user';
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
  let description;

  const getAvatar = function (count) {
    return avatarPath + Math.floor(Math.random() * count) + '.png';
  }

  let OFFERS = [];

  for (let i = 0; i < 8; i++) {
    let offer = {
      'author': getAvatar(8)
    };
    OFFERS.push(offer);
  }

  const mapEl = document.querySelector('.map');

  mapEl.classList.remove('map--faded');
})();
