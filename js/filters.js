const DefaultFilters = {
  HOUSING_TYPE: 'any',
  HOUSING_PRICE: 'any',
  HOUSING_ROOMS: 'any',
  HOUSING_GUESTS: 'any',
};

const HousingPrice = {
  MIDDLE: [10000, 50000],
};

const filtersFormElement = document.querySelector('.map__filters');
const fieldsetFiltersElements = filtersFormElement.querySelectorAll('fieldset');
const selectFiltersElements = filtersFormElement.querySelectorAll('select');

const disableFiltersForm = () => {
  filtersFormElement.classList.add('ad-form--disabled');
  fieldsetFiltersElements.forEach((fieldsetElement) => {
    fieldsetElement.disabled = true;
  });
  selectFiltersElements.forEach((selectElement) => {
    selectElement.disabled = true;
  });
}

const enableFiltersForm = () => {
  filtersFormElement.classList.remove('ad-form--disabled');
  fieldsetFiltersElements.forEach((fieldsetElement) => {
    fieldsetElement.disabled = false;
  });
  selectFiltersElements.forEach((selectElement) => {
    selectElement.disabled = false;
  });
}

const getPriceType = (price) => {
  let type = 'any';

  if (!isNaN(price)) {
    if (price >= HousingPrice.MIDDLE[1]) {
      type = 'high';
    } else if ((price >= HousingPrice.MIDDLE[0]) && (price < HousingPrice.MIDDLE[1])) {
      type = 'middle';
    } else {
      type = 'low';
    }
  }

  return type;
}

const getAccomodationRank = (accomodation) => {
  const housingTypeElement = filtersFormElement.querySelector('#housing-type');
  const housingPriceElement = filtersFormElement.querySelector('#housing-price');
  const housingRoomsElement = filtersFormElement.querySelector('#housing-rooms');
  const housingGuestsElement = filtersFormElement.querySelector('#housing-guests');
  const housingFeaturesElement = filtersFormElement.querySelector('#housing-features');
  const filterWifiElement = housingFeaturesElement.querySelector('#filter-wifi');
  const filterDishwasherElement = housingFeaturesElement.querySelector('#filter-dishwasher');
  const filterParkingElement = housingFeaturesElement.querySelector('#filter-parking');
  const filterWasherElement = housingFeaturesElement.querySelector('#filter-washer');
  const filterElevatorElement = housingFeaturesElement.querySelector('#filter-elevator');
  const filterConditionerElement = housingFeaturesElement.querySelector('#filter-conditioner');
  const priceType = getPriceType(accomodation.price);
  let rank = 0;

  if (accomodation.type === (housingTypeElement.value || DefaultFilters.HOUSING_TYPE)) {
    rank += 512;
  }
  if (priceType === (housingPriceElement.value || DefaultFilters.HOUSING_PRICE)) {
    rank += 256;
  }
  if (accomodation.rooms === (housingRoomsElement.value || DefaultFilters.HOUSING_ROOMS)) {
    rank += 128;
  }
  if (accomodation.guests === (housingGuestsElement.value || DefaultFilters.HOUSING_GUESTS)) {
    rank += 64;
  }
  if (accomodation.features.indexOf(filterWifiElement.value) !== -1) {
    rank += 32;
  }
  if (accomodation.features.indexOf(filterDishwasherElement.value) !== -1) {
    rank += 16;
  }
  if (accomodation.features.indexOf(filterParkingElement.value) !== -1) {
    rank += 8;
  }
  if (accomodation.features.indexOf(filterWasherElement.value) !== -1) {
    rank += 4;
  }
  if (accomodation.features.indexOf(filterElevatorElement.value) !== -1) {
    rank += 2;
  }
  if (accomodation.features.indexOf(filterConditionerElement.value) !== -1) {
    rank += 1;
  }

  return rank;
};

const sortAccomodations = (accomodationA, accomodationB) => {
  const rankA = getAccomodationRank(accomodationA);
  const rankB = getAccomodationRank(accomodationB);

  return rankB - rankA;
}

disableFiltersForm();

export {enableFiltersForm};
