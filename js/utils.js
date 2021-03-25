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

const isEscKey = (evt) => {
  let handled = false;
  if (evt.key !== undefined && evt.key === 'Escape') {
    handled = true;
  } else if (evt.keyCode !== undefined && evt.keyCode === 27) {
    handled = true;
  }
  return handled;
}

const debounce = (func, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export {getAccomodationLabel, getAccomodationMinPrice, isEscKey, debounce};
