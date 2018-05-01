'use strict';

(function() {
  const PINS_QUANTITY = 5;
  const MAP_PIN_WIDTH = 50;
  const MAP_PIN_HEIGTH = 70;
  const MAP_DISABLED_CLASS = 'map--faded';
  const MAP_PIN_ARROW_Y_CORRECTION = 50;

  // DOM elements
  let mapEl = document.querySelector('.map');
  let mapPinsListEl = mapEl.querySelector('.map__pins');
  let formResetEl = document.querySelector('.form__reset');
  let mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  let loadedOffers = [];
  let filteredOffers = [];

  let initialPinX = window.pin.mainPin.offsetLeft;
  let initialPinY = window.pin.mainPin.offsetTop + MAP_PIN_ARROW_Y_CORRECTION;

  const mapClickHandler = function(evt) {
    let clickedEl = evt.target;

    if (!clickedEl.hasAttribute('data-pin')) {
      clickedEl = clickedEl.parentNode;
    }

    let clickedIndex = clickedEl.getAttribute('data-pin');

    if (clickedIndex) {
      window.showCard.render(filteredOffers[clickedIndex]);
    }
  };

  const deletePins = function() {
    let pins = mapEl.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function(item) {
      item.parentNode.removeChild(item);
    });
  };

  const disablePage = function() {
    mapEl.classList.add(MAP_DISABLED_CLASS);
    deletePins();
    window.showCard.close();
    window.pin.mainPin.style.left = '';
    window.pin.mainPin.style.top = '';
    window.filter.reset();
    window.form.disable();
    window.form.updateAddress(initialPinX, initialPinY);
    window.scrollTo(0, 0);
    mapEl.removeEventListener('click', mapClickHandler, true);
  };

  const showOffersOnMap = function(data) {
    mapPinsListEl.appendChild(data);
  };

  const renderPins = function(data) {
    let pins = document.createDocumentFragment();

    data.forEach(function(offer, i) {
      let pin = mapPinTemplate.cloneNode(true);
      let pinLeft = (offer.location.x - MAP_PIN_WIDTH / 2) + 'px';
      let pinTop = (offer.location.y - MAP_PIN_HEIGTH) + 'px';

      pin.setAttribute('style', 'left: ' + pinLeft + '; top: ' + pinTop);
      pin.querySelector('img').setAttribute('src', offer.author.avatar);
      pin.setAttribute('data-pin', i);
      pins.appendChild(pin);
    });

    return pins;
  };

  const succesLoadDataHandler = function(loadedData) {
    loadedOffers = loadedData.slice(0);
    filteredOffers = loadedOffers.slice(0, PINS_QUANTITY);
    let renderedPins = renderPins(filteredOffers);
    showOffersOnMap(renderedPins);
    window.filter.enable();
  };

  const activatePage = function() {
    mapEl.classList.remove(MAP_DISABLED_CLASS);
    window.notification.hideAll();
    window.form.enable();
    window.backend.load(succesLoadDataHandler, window.notification.showError);
    mapEl.addEventListener('click', mapClickHandler, true);
  };

  const checkPageState = function() {
    return mapEl.classList.contains(MAP_DISABLED_CLASS);
  };

  formResetEl.addEventListener('click', disablePage);

  window.filter.setCallback(function() {
    deletePins();
    window.showCard.close();

    filteredOffers = window.filter.apply(loadedOffers).slice(0, PINS_QUANTITY);

    let updatedPins = renderPins(filteredOffers);

    showOffersOnMap(updatedPins);
  });

  // Set default address
  window.form.updateAddress(initialPinX, initialPinY);

  window.map = {
    checkPageState: checkPageState,
    activatePage: activatePage,
    disablePage: disablePage
  };
})();
