'use strict';

(function() {
  const formFiltersContainer = document.querySelector('.map__filters');
  const formFilterItemEl = formFiltersContainer.querySelectorAll('.map__filter');
  const formFiltersFeaturesEl = formFiltersContainer.querySelector('#housing-features');
  const filterChangeExternalHandler = null;

  const setCallBack = function(cb) {
    filterChangeExternalHandler = cb;
  };

  const enableFilters = function() {
    formFiltersFeaturesEl.removeAttribute('disabled');
    formFilterItemEl.forEach(function(filter) {
      filter.removeAttribute('disabled');
    });
  };

  window.filter = {
    enable: enableFilters
  };
})();
