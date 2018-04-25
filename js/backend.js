'use strict';

(function() {
  const SAVE_URL = 'https://js.dump.academy/keksobooking/';
  const LOAD_URL = 'https://js.dump.academy/keksobooking/data/';

  const Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  const TIMEOUT = 10000;

  const initXHR = function(onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      switch (xhr.status) {
        case Code.SUCCESS:
          onLoad(xhr.response);
          break;
        case Code.BAD_REQUEST:
          onError('Статус ответа: ' + xhr.status + '. В запросе синтаксическая ошибка.');
          break;
        case Code.FORBIDDEN:
          onError('Статус ответа: ' + xhr.status + '. В запросе отказано, недостаточно прав.');
          break;
        case Code.NOT_FOUND:
          onError('Статус ответа: ' + xhr.status + '. Страница не найдена');
          break;
        case Code.SERVER_ERROR:
          onError('Статус ответа: ' + xhr.status + '. Ой, неполадки на сервере, попробуйте чуть позже.');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function() {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function() {
      onError('Запрос не успел выполниться за ' + TIMEOUT + ' мс');
    });

    return xhr;
  };

  const load = function(onLoad, onError) {
    let xhr = initXHR(onLoad, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  const save = function(data, onLoad, onError) {
    let xhr = initXHR(onLoad, onError);
    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
