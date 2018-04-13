'use strict';

(function() {
  let offersList = [];

  const getAvatar = function(avatarId) {
    let avatarIndex = avatarId + 1;

    return avatarIndex = window.consts.AVATAR_PATH + '0' + avatarIndex + '.png';
  };

  const translateOfferType = function(type) {
    switch (type) {
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalo':
      return 'Халупа';
    default:
      break;
    }
  };

  const generateOffers = function(count) {
    for (let i = 0; i < count; i++) {
      offersList.push({
        author: {
          avatar: getAvatar(i)
        },
        offer: {
          title: window.util.getRandomElement(window.consts.OFFER_TITLES),
          address: window.util.getRandomNumber(window.consts.LOCATION_MIN_X, window.consts.LOCATION_MAX_X) + ' ' + window.util.getRandomNumber(window.consts.LOCATION_MIN_Y, window.consts.LOCATION_MAX_Y),
          price: window.util.getRandomNumber(window.consts.PRICE_MIN, window.consts.PRICE_MAX),
          type: translateOfferType(window.util.getRandomElement(window.consts.OFFER_TYPES)),
          rooms: window.util.getRandomNumber(window.consts.ROOMS_MIN, window.consts.ROOMS_MAX),
          guests: window.util.getRandomNumber(window.consts.GUESTS_MIN, window.consts.GUESTS_MAX),
          checkin: window.util.getRandomElement(window.consts.OFFER_CHECKINS),
          checkout: window.util.getRandomElement(window.consts.OFFER_CHECHOUTS),
          features: window.util.getRandomArr(window.consts.OFFER_FEATURES, window.util.getRandomIndex(window.consts.OFFER_FEATURES)),
          photos: window.util.getRandomArr(window.consts.OFFER_PHOTOS, window.consts.OFFER_PHOTOS.length),
          description: ''
        },
        location: {
          x: window.util.getRandomNumber(window.consts.LOCATION_MIN_X, window.consts.LOCATION_MAX_X),
          y: window.util.getRandomNumber(window.consts.LOCATION_MIN_Y, window.consts.LOCATION_MAX_Y)
        }
      });
    }
  };

  window.data = {
    generateOffers: generateOffers,
    offersList: offersList
  };
})();
