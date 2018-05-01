'use strict';

(function() {
  const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

  const avatarEl = document.querySelector('.notice__photo');
  const avatarPreviewEl = avatarEl.querySelector('img');
  const avatarUploadEl = avatarEl.querySelector('#avatar');
  const photosUploadElement = document.querySelector('#images');
  let photosContainer = document.querySelector('.notice__form fieldset:nth-last-child(2)');
  let uploadedPhotos = [];

  avatarUploadEl.addEventListener('change', function() {
    let file = this.files[0];
    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some(function(item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      window.notification.hideAll();

      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.addEventListener('load', function() {
        avatarPreviewEl.setAttribute('src', reader.result);
      });
    } else {
      window.notification.showError('Некорректный формат изображения - только .jpeg, .png или .gif');
    }
  });

  photosUploadElement.addEventListener('change', function() {
    let uploadedFiles = this.files;
    let uploadedPhotosFragment = document.createDocumentFragment();
    let uploadedPhotosContainer = document.createElement('div');
    uploadedPhotosContainer.classList.add('form__photos');

    [].forEach.call(uploadedFiles, function(file) {
      let fileName = file.name.toLowerCase();

      let matches = FILE_TYPES.some(function(item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        uploadedPhotos.push(file);

        let reader = new FileReader();
        let photoEl = document.createElement('div');

        photoEl.classList.add('form__photo');
        photoEl.setAttribute('draggable', true);

        let photoImgEl = document.createElement('img');
        photoImgEl.style.height = '60px';

        reader.readAsDataURL(file);

        reader.addEventListener('load', function () {
          photoImgEl.setAttribute('src', reader.result);
        });

        photoEl.appendChild(photoImgEl);
        uploadedPhotosFragment.appendChild(photoEl);
      } else {
        window.notification.showError('Некорректный формат изображения - только .jpeg, .png или .gif');
      }

      uploadedPhotosContainer.appendChild(uploadedPhotosFragment);
    });

    photosContainer.appendChild(uploadedPhotosContainer);
  });
})();
