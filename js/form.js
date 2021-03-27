import {getAccomodationMinimalPrice, isEscKey} from './utils.js';
import {createFetch} from './create-fetch.js';

const MINIMAL_TITLE_LENGTH = 30;
const MAXIMAL_TITLE_LENGTH = 100;
const ROOM_NUMBER_NOT_FOR_GUESTS = 100;
const CAPACITY_NOT_FOR_GUESTS = 0;

const adFormElement = document.querySelector('.ad-form');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const addressElement = adFormElement.querySelector('#address');
const fieldsetFormElements = adFormElement.querySelectorAll('fieldset');
const titleElement = adFormElement.querySelector('#title');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const successTemplate = document.querySelector('#success')
  .content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);
const mainElement = document.querySelector('main');
const errorTemplate = document.querySelector('#error')
  .content.querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);
const errorButtonElement = errorElement.querySelector('.error__button');
const resetElement = adFormElement.querySelector('.ad-form__reset');

const setPriceElementData = (value) => {
  value = value ? value : typeElement.value;
  const minimalPrice = getAccomodationMinimalPrice(value);
  priceElement.placeholder = minimalPrice;
  priceElement.min = minimalPrice;
}

const validatePrice = () => {
  const priceValue = Number(priceElement.value);
  const priceMinimal = Number(priceElement.min);
  const priceMaximal = Number(priceElement.max);

  if (priceValue > priceMaximal) {
    priceElement.setCustomValidity(`Цена должна быть ниже либо равна ${priceMaximal} р.`);
  } else if (priceValue < priceMinimal) {
    priceElement.setCustomValidity(`Цена должна быть выше либо равна ${priceMinimal} р.`);
  } else {
    priceElement.setCustomValidity('');
  }

  priceElement.reportValidity();
}

typeElement.addEventListener('change', (evt) => {
  setPriceElementData(evt.target.value);
  validatePrice();
});

timeInElement.addEventListener('change', (evt) => {
  timeOutElement.value = evt.target.value;
});

timeOutElement.addEventListener('change', (evt) => {
  timeInElement.value = evt.target.value;
});

const disableForm = () => {
  adFormElement.classList.add('ad-form--disabled');
  fieldsetFormElements.forEach((fieldsetElement) => {
    fieldsetElement.disabled = true;
  });
}

const enableForm = () => {
  adFormElement.classList.remove('ad-form--disabled');
  fieldsetFormElements.forEach((fieldsetElement) => {
    fieldsetElement.disabled = false;
  });
}

const setAddress = ({lat, lng}) => {
  addressElement.value = `${lat}, ${lng}`;
}

titleElement.addEventListener('input', () => {
  const valueLength = titleElement.value.length;

  if (valueLength < MINIMAL_TITLE_LENGTH) {
    titleElement.setCustomValidity('Ещё ' + (MINIMAL_TITLE_LENGTH - valueLength) +' симв.');
  } else if (valueLength > MAXIMAL_TITLE_LENGTH) {
    titleElement.setCustomValidity('Удалите лишние ' + (valueLength - MAXIMAL_TITLE_LENGTH) +' симв.');
  } else {
    titleElement.setCustomValidity('');
  }

  titleElement.reportValidity();
});

const validateRoomCapacity = () => {
  let error = '';
  const capacity = Number(capacityElement.value);
  const roomNumber = Number(roomNumberElement.value);

  if (roomNumber === ROOM_NUMBER_NOT_FOR_GUESTS && capacity !== CAPACITY_NOT_FOR_GUESTS) {
    error = 'Только не для гостей';
  } else if (roomNumber !== ROOM_NUMBER_NOT_FOR_GUESTS && capacity === CAPACITY_NOT_FOR_GUESTS) {
    error = 'Только для 100 комнат';
  } else if (capacity > roomNumber) {
    error = 'Количество гостей не должно превышать количество комнат.';
  }

  capacityElement.setCustomValidity(error);
  capacityElement.reportValidity();
}

const setAdFormSubmit = (onSuccess, onError) => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const url = 'https://22.javascript.pages.academy/keksobooking';
    const formData = new FormData(evt.target);
    const options = {
      method: 'POST',
      body: formData,
    };

    createFetch(url, options, onSuccess, onError);
  });
};

const resetForm = () => {
  adFormElement.reset();
}

const setAdFormReset = (onReset) => {
  resetElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    onReset();
  });
};

const removeSuccessElement = () => {
  successElement.remove();
  window.removeEventListener('keydown', handleSuccessWindowKeydown);
  document.removeEventListener('click', handleSuccessDocumentClick);
}

const handleSuccessWindowKeydown = (evt) => {
  const isEsc = isEscKey(evt);

  if (isEsc) {
    removeSuccessElement();
  }
}

const handleSuccessDocumentClick = (evt) => {
  if (mainElement.contains(successElement)) {
    evt.preventDefault();
    removeSuccessElement();
  }
}

const showSuccessMessage = () => {
  mainElement.appendChild(successElement);

  window.addEventListener('keydown', handleSuccessWindowKeydown);
  document.addEventListener('click', handleSuccessDocumentClick);
};

const removeFormErrorElement = () => {
  errorElement.remove();
  window.removeEventListener('keydown', handleFormWindowKeydown);
  errorButtonElement.removeEventListener('click', handleErrorBtnClick);
  document.addEventListener('click', handleFormDocumentClick);
}

const handleFormWindowKeydown = (evt) => {
  const isEsc = isEscKey(evt);

  if (isEsc) {
    removeFormErrorElement();
  }
}

const handleErrorBtnClick = (evt) => {
  if (mainElement.contains(errorElement)) {
    evt.preventDefault();
    removeFormErrorElement();
  }
}

const handleFormDocumentClick = (evt) => {
  if (mainElement.contains(errorElement)) {
    evt.preventDefault();
    removeFormErrorElement();
  }
}

const showErrorMessage = () => {
  mainElement.appendChild(errorElement);

  window.addEventListener('keydown', handleFormWindowKeydown);
  errorButtonElement.addEventListener('click', handleErrorBtnClick);
  document.addEventListener('click', handleFormDocumentClick);
}

priceElement.addEventListener('input', validatePrice);
roomNumberElement.addEventListener('input', validateRoomCapacity);
capacityElement.addEventListener('input', validateRoomCapacity);

setPriceElementData(typeElement.value);
disableForm();

export {enableForm, disableForm, setAddress, setAdFormSubmit, resetForm, setAdFormReset,
  showSuccessMessage, showErrorMessage, setPriceElementData};
