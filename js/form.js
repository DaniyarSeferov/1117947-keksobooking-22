import {getAccomodationMinPrice} from './utils.js';

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

const setPriceElementData = (value) => {
  const minPrice = getAccomodationMinPrice(value);
  priceElement.placeholder = minPrice;
  priceElement.min = minPrice;
}

setPriceElementData(typeElement.value);

typeElement.addEventListener('change', (event) => {
  setPriceElementData(event.target.value);
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

priceElement.addEventListener('input', () => {
  const priceValue = Number(priceElement.value);

  if (priceValue > priceElement.max) {
    priceElement.setCustomValidity(`Цена должна быть ниже либо равна ${priceElement.max} р.`);
  } else if (priceValue < priceElement.min) {
    priceElement.setCustomValidity(`Цена должна быть выше либо равна ${priceElement.min} р.`);
  } else {
    priceElement.setCustomValidity('');
  }

  priceElement.reportValidity();
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

roomNumberElement.addEventListener('input', () => {
  validateRoomCapacity();
});

capacityElement.addEventListener('input', () => {
  validateRoomCapacity();
});

disableForm();

export {enableForm, disableForm, setAddress};
