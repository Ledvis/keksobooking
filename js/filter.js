'use strict';

(function() {
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

  const enableFilters = function() {
    formFiltersFeaturesEl.removeAttribute('disabled');
    formFilterItemEl.forEach(function(filter) {
      filter.removeAttribute('disabled');
    });
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
  });

  window.filter = {
    enable: enableFilters,
  };
})();
