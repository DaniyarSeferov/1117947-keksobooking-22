import {getAccomodationMinPrice} from './utils.js';

const adFormElement = document.querySelector('.ad-form');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const addressElement = adFormElement.querySelector('#address');
const fieldsetFormElements = adFormElement.querySelectorAll('fieldset');

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

disableForm();

export {enableForm, setAddress};
