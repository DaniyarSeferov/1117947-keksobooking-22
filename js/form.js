import {getAccomodationMinPrice} from './utils.js';
import {createFetch} from './create-fetch.js';

const adFormElement = document.querySelector('.ad-form');
const typeElement = adFormElement.querySelector('#type');
const priceElement = adFormElement.querySelector('#price');
const timeInElement = adFormElement.querySelector('#timein');
const timeOutElement = adFormElement.querySelector('#timeout');
const resetElement = adFormElement.querySelector('.ad-form__reset');
const successTemplate = document.querySelector('#success')
  .content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);
const mainElement = document.querySelector('main');

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

const setAdFormReset = (onClick) => {
  resetElement.addEventListener('click', onClick);
};

const showSuccessMsg = () => {
  mainElement.appendChild(successElement);

  window.addEventListener('keydown', function (evt) {
    let handled = false;
    if (evt.key !== undefined && evt.key === 'Escape') {
      handled = true;
    } else if (evt.keyCode !== undefined && evt.keyCode === 27) {
      handled = true;
    }

    if (handled) {
      successElement.remove();
    }
  });

  document.addEventListener('click', function (evt) {
    if (mainElement.contains(successElement)) {
      evt.preventDefault();
      successElement.remove();
    }
  });
};

export {setAdFormSubmit, resetForm, setAdFormReset, showSuccessMsg};
