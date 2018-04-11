'use strict';

(function() {
  let dragedItem = window.map.mapMainPinEl;

  const onMouseDownClick = function(downEvt) {
    let startCord = {
      x: downEvt.clientX,
      y: downEvt.clientY,
    };

    const onMouseMove = function(moveEvt) {
      moveEvt.preventDefault();

      dragedItem.style.left =
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  dragedItem.addEventListener('mousedown', onMouseDownClick);
})();
