'use strict';

(function() {
  let formEl = document.querySelector('.notice__form');
  let fieldsetEls = formEl.querySelectorAll('fieldset');

  const enableForm = function() {
    formEl.classList.remove('notice__form--disabled');
    let fieldsetEl;

    for (let i = 0; i < fieldsetEls.length; i++) {
      fieldsetEl = fieldsetEls[i];
      fieldsetEl.removeAttribute('disabled');
    }
  };

  window.form = {
    enableForm: enableForm
  };
})();
