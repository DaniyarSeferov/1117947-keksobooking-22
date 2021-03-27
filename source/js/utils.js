const ESCAPE_KEY_CODE = 27;

const getAccomodationMap = (type) => {
  const accomodationMap = {
    palace: {
      label: 'Дворец',
      minimalPrice: 10000,
    },
    flat: {
      label: 'Квартира',
      minimalPrice: 1000,
    },
    house: {
      label: 'Дом',
      minimalPrice: 5000,
    },
    bungalow: {
      label: 'Бунгало',
      minimalPrice: 0,
    },
  };

  return accomodationMap[type];
};

const getAccomodationLabel = (type) => {
  const accomodationMap = getAccomodationMap(type);
  return accomodationMap ? accomodationMap.label : '';
}

const getAccomodationMinimalPrice = (type) => {
  const accomodationMap = getAccomodationMap(type);
  return accomodationMap ? accomodationMap.minimalPrice : 0;
}

const isEscKey = (evt) => {
  let handled = false;
  if (evt.key !== undefined && evt.key === 'Escape') {
    handled = true;
  } else if (evt.keyCode !== undefined && evt.keyCode === ESCAPE_KEY_CODE) {
    handled = true;
  }
  return handled;
}

const debounce = (cb, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { cb.apply(this, args); }, timeout);
  };
}

export {getAccomodationLabel, getAccomodationMinimalPrice, isEscKey, debounce};
