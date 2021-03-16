const ALERT_SHOW_TIME = 5000;

const validateRandomRange = (min, max) => {
  if (min < 0 || max < 0) {
    throw new Error('Parameters must be greater than or equal to zero.')
  }
  else if (min > max) {
    throw new Error('min value must be less than max.');
  }
}

/**
 * Generates a random integer number from min to max including both min and max as possible values.
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
 *
 * @param min
 * @param max
 * @returns {number}
 */
const getRandomIntInclusive = (min, max) => {
  validateRandomRange(min, max);

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generates a random float number from min to max including both min and max as possible values.
 * Source: http://www.jacklmoore.com/notes/rounding-in-javascript/
 *
 * @param min
 * @param max
 * @param decimals
 * @returns {number}
 */
const getRandomFloatInclusive = (min, max, decimals = 0) => {
  validateRandomRange(min, max);

  let rand = Math.random() * (max - min) + min;
  return Number(Math.floor(rand + 'e' + decimals) + 'e-' + decimals);
};

const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

const getRandomArrayElements = (elements) => {
  const randNumber = getRandomIntInclusive(0, elements.length - 1);
  return elements.slice(randNumber);
};

const getAccomodationMap = (type) => {
  const accomodationMap = {
    palace: {
      label: 'Дворец',
      minPrice: 10000,
    },
    flat:{
      label: 'Квартира',
      minPrice: 1000,
    },
    house:{
      label: 'Дом',
      minPrice: 5000,
    },
    bungalow:{
      label: 'Бунгало',
      minPrice: 0,
    },
  };

  return accomodationMap[type];
};

const getAccomodationLabel = (type) => {
  const accomodationMap = getAccomodationMap(type);
  return accomodationMap ? accomodationMap.label : '';
}

const getAccomodationMinPrice = (type) => {
  const accomodationMap = getAccomodationMap(type);
  return accomodationMap ? accomodationMap.minPrice : 0;
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = '120px';
  alertContainer.style.right = 0;
  alertContainer.style.bottom = 'auto';
  alertContainer.style.left = 0;
  alertContainer.style.width = '600px';
  alertContainer.style.minHeight = '300px';
  alertContainer.style.margin = 'auto';
  alertContainer.style.padding = '20px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.boxShadow = '0 4px 20px grey';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const isEscKey = (evt) => {
  let handled = false;
  if (evt.key !== undefined && evt.key === 'Escape') {
    handled = true;
  } else if (evt.keyCode !== undefined && evt.keyCode === 27) {
    handled = true;
  }
  return handled;
}

export {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement,
  getRandomArrayElements, getAccomodationLabel, getAccomodationMinPrice, showAlert, isEscKey};
