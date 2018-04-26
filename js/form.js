'use strict';

(function() {
  const INPUT_DEFAULT_BORDER_COLOR = '#d9d9d3';
  const FORM_DISABLED_CLASS = 'notice__form--disabled';
  const NO_GUESTS_ALLOWED = 100;
  const formEl = document.querySelector('.notice__form');
  const resetEl = formEl.querySelector('.form__reset');
  const fieldsetsEl = formEl.querySelectorAll('fieldset');
  const titleEl = formEl.querySelector('#title');
  const addressEl = formEl.querySelector('#address');
  const priceEl = formEl.querySelector('#price');
  const timeinEl = formEl.querySelector('#timein');
  const timeoutEl = formEl.querySelector('#timeout');
  const typeEl = formEl.querySelector('#type');
  const roomEl = formEl.querySelector('#room_number');
  const capacitySelectEl = formEl.querySelector('#capacity');
  const capacityOptionsEl = capacitySelectEl.querySelectorAll('option');

  const OfferType = {
    BUNGALO: {
      minPrice: 0
    },
    FLAT: {
      minPrice: 1000
    },
    HOUSE: {
      minPrice: 5000
    },
    PALACE: {
      minPrice: 10000
    }
  };

  const OfferRoomCapacity = {
    1: ['1'],
    2: ['2', '1'],
    3: ['3', '2', '1'],
    100: ['0']
  };

  const validateTitle = function() {
    if (titleEl.validity.valueMissing) {
      titleEl.setCustomValidity('Введите заголовок!');
      titleEl.style.borderColor = 'red';
    } else if (titleEl.validity.tooShort) {
      titleEl.setCustomValidity('Слишком короткий заголовок - минимум 30 символов!');
      titleEl.style.borderColor = 'red';
    } else if (titleEl.validity.tooLong) {
      titleEl.setCustomValidity('Слишком длинный заголовок - не больше 100 символов!');
      titleEl.style.borderColor = 'red';
    } else {
      titleEl.setCustomValidity('');
      titleEl.style.borderColor = INPUT_DEFAULT_BORDER_COLOR;
    }
  };

  const validatePrice = function() {
    if (priceEl.validity.valueMissing) {
      priceEl.setCustomValidity('Укажите цену');
      priceEl.style.borderColor = 'red';
    } else if (priceEl.validity.rangeOverflow) {
      priceEl.setCustomValidity('Слишком много! Цена не должна быть выше 1 млн');
      priceEl.style.borderColor = 'red';
    } else if (priceEl.validity.rangeUnderflow) {
      priceEl.setCustomValidity('Маловато! Минимальная цена: ' + priceEl.min);
      priceEl.style.borderColor = 'red';
    } else {
      priceEl.setCustomValidity('');
      priceEl.style.borderColor = INPUT_DEFAULT_BORDER_COLOR;
    }

    priceEl.addEventListener('input', function() {
      priceEl.setCustomValidity('');
      priceEl.style.borderColor = INPUT_DEFAULT_BORDER_COLOR;
    });
  };

  const successSubmitFormHandler = function() {
    window.notification.showInfo();
    window.map.disablePage();
    window.filter.reset();
  };

  const updateAddress = function(x, y) {
    addressEl.value = x + ', ' + y;
  };

  const updatePrice = function() {
    let minPrice = OfferType[typeEl.value.toUpperCase()].minPrice;
    priceEl.min = minPrice;
    priceEl.placeholder = minPrice;
  };

  const updateCapacity = function() {
    let selectedRooms = parseInt(roomEl.options[roomEl.selectedIndex].value);
    let allowedGuests = OfferRoomCapacity[selectedRooms];

    capacitySelectEl.value = selectedRooms;

    if (selectedRooms === NO_GUESTS_ALLOWED) {
      capacitySelectEl.value = 0;
    }

    capacityOptionsEl.forEach(function(item) {
      item.disabled = true;

      if (allowedGuests.indexOf(item.value) !== -1) {
        item.disabled = false;
      }
    });
  };

  const typeElChangeHandler = function() {
    updatePrice();
  };

  const roomElChangeHandler = function() {
    updateCapacity();
  };

  const resetForm = function() {
    formEl.reset();
    updatePrice();
    titleEl.style.borderColor = INPUT_DEFAULT_BORDER_COLOR;
    priceEl.style.borderColor = INPUT_DEFAULT_BORDER_COLOR;
  };

  const enableForm = function() {
    formEl.classList.remove(FORM_DISABLED_CLASS);
    typeEl.addEventListener('change', typeElChangeHandler);
    roomEl.addEventListener('change', roomElChangeHandler);
    let fieldsetEl;

    for (let i = 0; i < fieldsetsEl.length; i++) {
      fieldsetEl = fieldsetsEl[i];
      fieldsetEl.removeAttribute('disabled');
    }
  };

  const disableFormFields = function() {
    fieldsetsEl.forEach(function(fieldset) {
      fieldset.disabled = true;
    });
  };

  const disableForm = function() {
    formEl.classList.add(FORM_DISABLED_CLASS);
    typeEl.removeEventListener('change', typeElChangeHandler);
    roomEl.removeEventListener('change', roomElChangeHandler);
    disableFormFields();
    resetForm();
  };

  // Sync checkin fields
  timeinEl.addEventListener('change', function() {
    timeoutEl.value = timeinEl.value;
  });
  timeoutEl.addEventListener('change', function() {
    timeinEl.value = timeoutEl.value;
  });

  // Validate fields
  titleEl.addEventListener('keyup', function() {
    validateTitle();
  });
  priceEl.addEventListener('keyup', function() {
    validatePrice();
  });

  formEl.addEventListener('submit', function(evt) {
    evt.preventDefault();
    let formData = new FormData(formEl);
    window.backend.save(formData, successSubmitFormHandler, window.notification.showError);
  });

  resetEl.addEventListener('click', function() {
    window.map.disablePage();
  });

  window.form = {
    enable: enableForm,
    disable: disableForm,
    updateAddress: updateAddress
  };
})();
