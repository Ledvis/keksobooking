'use strict';

(function() {
  const createMessage = function(classname, text) {
    let message = document.createElement('div');
    message.classList.add('notification');
    message.classList.add(classname);

    let closeBtn = document.createElement('button');
    closeBtn.textContent = 'Закрыть';
    closeBtn.classList.add('popup__close');

    message.textContent = text;
    message.appendChild(closeBtn);

    closeBtn.addEventListener('click', function(evt) {
      evt.target.parentNode.remove();
    });

    document.body.insertAdjacentElement('afterbegin', message);
  };

  const showError = function(errorMessage) {
    createMessage('error', errorMessage);
  };

  const showMessage = function() {
    createMessage('success', 'Форма успешно отправлена');
  };

  const hideMessages = function() {
    let currentNotifications = document.querySelectorAll('.notification');
    currentNotifications.forEach(function(item) {
      item.parentNode.removeChild(item);
    });
  };

  window.notification = {
    showError: showError,
    showInfo: showMessage,
    hideAll: hideMessages
  };
})();
