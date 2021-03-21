import {getAccomodationMinPrice, isEscKey} from './utils.js';
import {createFetch} from './create-fetch.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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
const errorBtnElement = errorElement.querySelector('.error__button');

const setPriceElementData = (value) => {
  const minPrice = getAccomodationMinPrice(value);
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
}

const validatePrice = () => {
  const priceValue = Number(priceElement.value);
  const priceMin = Number(priceElement.min);
  const priceMax = Number(priceElement.max);

  if (priceValue > priceMax) {
    priceElement.setCustomValidity(`Цена должна быть ниже либо равна ${priceMax} р.`);
  } else if (priceValue < priceMin) {
    priceElement.setCustomValidity(`Цена должна быть выше либо равна ${priceMin} р.`);
  } else {
    priceElement.setCustomValidity('');
  }

  priceElement.reportValidity();
}

typeElement.addEventListener('change', (event) => {
  setPriceElementData(event.target.value);
  validatePrice();
});

timeInElement.addEventListener('change', (event) => {
  timeOutElement.value = event.target.value;
});

timeOutElement.addEventListener('change', (event) => {
  timeInElement.value = event.target.value;
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

  if (valueLength < MIN_TITLE_LENGTH) {
    titleElement.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleElement.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
  } else {
    titleElement.setCustomValidity('');
  }

  titleElement.reportValidity();
});

const validateRoomCapacity = () => {
  let error = '';
  const capacity = Number(capacityElement.value);
  const roomNumber = Number(roomNumberElement.value);

  if (roomNumber === 100 && capacity !== 0) {
    error = 'Только не для гостей';
  } else if (roomNumber !== 100 && capacity === 0) {
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
  adFormElement.addEventListener('reset', () => {
    setTimeout(onReset, 1);
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

const showSuccessMsg = () => {
  mainElement.appendChild(successElement);

  window.addEventListener('keydown', handleSuccessWindowKeydown);
  document.addEventListener('click', handleSuccessDocumentClick);
};

const removeFormErrorElement = () => {
  errorElement.remove();
  window.removeEventListener('keydown', handleFormWindowKeydown);
  errorBtnElement.removeEventListener('click', handleErrorBtnClick);
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

const showErrorMsg = () => {
  mainElement.appendChild(errorElement);

  window.addEventListener('keydown', handleFormWindowKeydown);
  errorBtnElement.addEventListener('click', handleErrorBtnClick);
}

priceElement.addEventListener('input', validatePrice);
roomNumberElement.addEventListener('input', validateRoomCapacity);
capacityElement.addEventListener('input', validateRoomCapacity);

setPriceElementData(typeElement.value);
disableForm();

export {enableForm, disableForm, setAddress, setAdFormSubmit, resetForm, setAdFormReset,
  showSuccessMsg, showErrorMsg};
