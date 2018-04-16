'use strict';

(function() {
  const MapLimit = {
    TOP: 100,
    RIGHT: 1200,
    BOTTOM: 500,
    LEFT: 0
  };

  const MAIN_PIN_ARROW_CORRECTION = 50;

  let mainPinEl = document.querySelector('.map__pin--main');

  const onMouseDownClick = function(downEvt) {
    downEvt.preventDefault();

    let startPinCoord = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    const onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startPinCoord.x - moveEvt.clientX,
        y: startPinCoord.y - moveEvt.clientY
      };

      startPinCoord = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let shiftedPinPosition = {
        left: mainPinEl.offsetLeft - shift.x,
        top: mainPinEl.offsetTop - shift.y
      };

      // horizontal move
      if (shiftedPinPosition.left > MapLimit.RIGHT) {
        mainPinEl.style.left = MapLimit.RIGHT + 'px';
      } else if (shiftedPinPosition.left < MapLimit.LEFT) {
        mainPinEl.style.left = MapLimit.LEFT + 'px';
      } else {
        mainPinEl.style.left = shiftedPinPosition.left + 'px';
      }

      // vertical move
      if (shiftedPinPosition.top > MapLimit.BOTTOM) {
        mainPinEl.style.top = MapLimit.BOTTOM + 'px';
      } else if (shiftedPinPosition.top < MapLimit.TOP) {
        mainPinEl.style.top = MapLimit.TOP + 'px';
      } else {
        mainPinEl.style.top = shiftedPinPosition.top + 'px';
      }
    };

    const onMouseUp = function(upEvt) {
      upEvt.preventDefault();

      let isPageDisabled = window.map.checkPageState();

      if (isPageDisabled) {
        window.map.activatePage();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPinEl.addEventListener('mousedown', onMouseDownClick);
  mainPinEl.addEventListener('keydown', function(evt) {
    let isPageDisabled = window.map.checkPageState();

    if (isPageDisabled) {
      window.util.isEnterEvent(evt, window.map.activatePage);
    }
  });
})();
