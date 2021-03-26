const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const THUMBNAIL_DEFAULT_URL = 'img/muffin-grey.svg';

const avatarFileChooserElement = document.querySelector('#avatar');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const accommodationFileChooserElement = document.querySelector('#images');
const accommodationPreviewElement = document.querySelector('.ad-form__photo img');

const createPreview = (fileChooserElement, previewElement) => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => {
    return fileName.endsWith(fileType);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewElement.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const initThumbnails = () => {
  avatarFileChooserElement.addEventListener('change', () => {
    createPreview(avatarFileChooserElement, avatarPreviewElement);
  });

  accommodationFileChooserElement.addEventListener('change', () => {
    createPreview(accommodationFileChooserElement, accommodationPreviewElement);
  });
}

const setDefaultThumbnails = () => {
  avatarPreviewElement.src = THUMBNAIL_DEFAULT_URL;
  accommodationPreviewElement.src = THUMBNAIL_DEFAULT_URL;
}

export {initThumbnails, setDefaultThumbnails};
