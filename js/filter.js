'use strict';

(function() {
  const Price = {
    LOW: 10000,
    HIGH: 50000
  };
  const filtersEl = document.querySelector('.map__filters');
  const formFilterItemEl = filtersEl.querySelectorAll('.map__filter');
  const formFiltersFeaturesEl = filtersEl.querySelector('#housing-features');
  let typeFilterValue = 'any';
  let priceFilterValue = 'any';
  let roomsFilterValue = 'any';
  let guestsFilterValue = 'any';
  let wifiFilterValue = false;
  let dishwasherFilterValue = false;
  let parkingFilterValue = false;
  let washerFilterValue = false;
  let elevatorFilterValue = false;
  let conditionerFilterValue = false;
  let fileChangeExternalHandler = null;

  const setCallback = function(cb) {
    fileChangeExternalHandler = cb;
  };

  const applyFilter = function(offers) {
    return offers.filter(function(offer) {
      let hasAppropriatePrice;

      switch (priceFilterValue) {
        case 'any':
          hasAppropriatePrice = true;
          break;
        case 'low':
          hasAppropriatePrice = offer.offer.price < Price.LOW;
          break;
        case 'middle':
          hasAppropriatePrice = offer.offer.price >= Price.LOW && offer.offer.price <= Price.HIGH;
          break;
        case 'high':
          hasAppropriatePrice = offer.offer.price > Price.HIGH;
          break;
      }

      let hasAppropiateType = typeFilterValue === 'any' || offer.offer.type.toString() === typeFilterValue;
      let hasAppropiateRooms = roomsFilterValue === 'any' || offer.offer.rooms.toString() === roomsFilterValue;
      let hasAppropiateGuests = guestsFilterValue === 'any' || offer.offer.guests.toString() === guestsFilterValue;
      let hasWiFi = wifiFilterValue === false || offer.offer.features.indexOf('wifi') !== -1;
      let hasDishWasher = dishwasherFilterValue === false || offer.offer.features.indexOf('dishwasher') !== -1;
      let hasParking = parkingFilterValue === false || offer.offer.features.indexOf('parking') !== -1;
      let hasWasher = washerFilterValue === false || offer.offer.features.indexOf('washer') !== -1;
      let hasElevator = elevatorFilterValue === false || offer.offer.features.indexOf('elevator') !== -1;
      let hasConditioner = conditionerFilterValue === false || offer.offer.features.indexOf('conditioner') !== -1;

      return hasAppropiateType && hasAppropriatePrice && hasAppropiateRooms && hasAppropiateGuests && hasWiFi && hasDishWasher && hasParking && hasWasher && hasElevator && hasConditioner;
    });
  };

  const enableFilters = function() {
    formFiltersFeaturesEl.removeAttribute('disabled');
    formFilterItemEl.forEach(function(filter) {
      filter.removeAttribute('disabled');
    });
  };

  const disableFilters = function() {
    formFiltersFeaturesEl.setAttribute('disabled', true);
    formFilterItemEl.forEach(function(filter) {
      filter.setAttribute('disabled', true);
    });
  };

  const resetFilters = function() {
    filtersEl.reset();
    disableFilters();
  };

  filtersEl.addEventListener('change', function(evt) {
    let selectedFilter = evt.target;

    switch (selectedFilter.getAttribute('id')) {
      case 'housing-type':
        typeFilterValue = selectedFilter.value;
        break;
      case 'housing-price':
        priceFilterValue = selectedFilter.value;
        break;
      case 'housing-rooms':
        roomsFilterValue = selectedFilter.value;
        break;
      case 'housing-guests':
        guestsFilterValue = selectedFilter.value;
        break;
      case 'filter-wifi':
        wifiFilterValue = selectedFilter.checked;
        break;
      case 'filter-dishwasher':
        dishwasherFilterValue = selectedFilter.checked;
        break;
      case 'filter-parking':
        parkingFilterValue = selectedFilter.checked;
        break;
      case 'filter-washer':
        washerFilterValue = selectedFilter.checked;
        break;
      case 'filter-elevator':
        elevatorFilterValue = selectedFilter.checked;
        break;
      case 'filter-conditioner':
        conditionerFilterValue = selectedFilter.checked;
        break;
      default:
        break;
    }

    if (typeof fileChangeExternalHandler === 'function') {
      window.util.debounce(fileChangeExternalHandler);
    }
  });

  window.filter = {
    apply: applyFilter,
    enable: enableFilters,
    disable: disableFilters,
    reset: resetFilters,
    setCallback: setCallback
  };
})();
