'use strict';

(function() {
  let mapEl = document.querySelector('.map');
  let mainPinEl = mapEl.querySelector('.map__pin--main');
  let mapFiltersElement = mapEl.querySelector('.map__filters-container');

  const onMouseDownClick = function(downEvt) {
    let startPinCoord = {
      x: downEvt.offsetX,
      y: downEvt.offsetY
    };

    const onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();

      mainPinEl.style.left = (moveEvt.offsetX + startPinCoord.x) + 'px';
      mainPinEl.style.top = (moveEvt.offsetY + startPinCoord.y) + 'px';
    };

    const onMouseUp = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPinEl.addEventListener('mousedown', onMouseDownClick);
})();
