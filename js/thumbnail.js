const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const THUMBNAIL_DEFAULT_URL = 'img/muffin-grey.svg';

const avatarFileChooserElm = document.querySelector('#avatar');
const avatarPreviewElm = document.querySelector('.ad-form-header__preview img');
const accommodationFileChooserElm = document.querySelector('#images');
const accommodationPreviewElm = document.querySelector('.ad-form__photo img');

const createPreview = (fileChooserElm, previewElm) => {
  const file = fileChooserElm.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewElm.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const initThumbnails = () => {
  avatarFileChooserElm.addEventListener('change', () => {
    createPreview(avatarFileChooserElm, avatarPreviewElm);
  });

  accommodationFileChooserElm.addEventListener('change', () => {
    createPreview(accommodationFileChooserElm, accommodationPreviewElm);
  });
}

const setDefaultThumbnails = () => {
  avatarPreviewElm.src = THUMBNAIL_DEFAULT_URL;
  accommodationPreviewElm.src = THUMBNAIL_DEFAULT_URL;
}

export {initThumbnails, setDefaultThumbnails};
