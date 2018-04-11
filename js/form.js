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

  const disableForm = function() {
    formEl.classList.add('notice__form--disabled');
    let fieldsetEl;

    for (let i = 0; i < fieldsetEls.length; i++) {
      fieldsetEl = fieldsetEls[i];
      fieldsetEl.setAttribute('disabled', true);
    }
  };

  window.form = {
    enableForm: enableForm,
    disableForm: disableForm
  };
})();
