import {getAccomodationMinPrice} from './utils.js';

const adFormElement = document.querySelector('.ad-form');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
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

titleElement.addEventListener('invalid', () => {
  if (titleElement.validity.tooShort) {
    titleElement.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
  } else if (titleElement.validity.tooLong) {
    titleElement.setCustomValidity('Имя не должно превышать 100 символов');
  } else if (titleElement.validity.valueMissing) {
    titleElement.setCustomValidity('Обязательное поле');
  } else {
    titleElement.setCustomValidity('');
  }
});

const validateRoomCapacity = () => {
  let error = '';
  const capacity = Number(capacityElement.value);
  const roomNumber = Number(roomNumberElement.value);

  if (roomNumber === 100 && capacity !== 0) {
    error = 'Только не для гостей';
  } else if (roomNumber !== 100 && capacity === 0) {
    error = 'Только 100 комнат';
  } else if (capacity > roomNumber) {
    error = 'Количество гостей не должно превышать количество комнат.';
  }

  return error;
}

roomNumberElement.addEventListener('input', () => {
  const error = validateRoomCapacity();
  roomNumberElement.setCustomValidity(error);
  roomNumberElement.reportValidity();
});

capacityElement.addEventListener('input', () => {
  const error = validateRoomCapacity();
  capacityElement.setCustomValidity(error);
  capacityElement.reportValidity();
});
