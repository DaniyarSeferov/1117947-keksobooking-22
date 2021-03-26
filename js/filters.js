const DefaultFilters = {
  HOUSING_TYPE: 'any',
  HOUSING_PRICE: 'any',
  HOUSING_ROOMS: 'any',
  HOUSING_GUESTS: 'any',
};

const HousingPrices = {
  MIDDLE_PRICES: [10000, 50000],
};

const FiltersRank = {
  HOUSING_TYPE: 512,
  HOUSING_PRICE: 256,
  HOUSING_ROOMS: 128,
  HOUSING_GUESTS: 64,
  FEATURES_WIFI: 32,
  FEATURES_DISHWASHER: 16,
  FEATURES_PARKING: 8,
  FEATURES_WASHER: 4,
  FEATURES_ELEVATOR: 2,
  FEATURES_CONDITIONER: 1,
};

const filtersFormElement = document.querySelector('.map__filters');
const fieldsetFiltersElements = filtersFormElement.querySelectorAll('fieldset');
const selectFiltersElements = filtersFormElement.querySelectorAll('select');
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

const disableFiltersForm = () => {
  filtersFormElement.classList.add('map__filters--disabled');
  fieldsetFiltersElements.forEach((fieldsetElement) => {
    fieldsetElement.disabled = true;
  });
  selectFiltersElements.forEach((selectElement) => {
    selectElement.disabled = true;
  });
}

const enableFiltersForm = () => {
  filtersFormElement.classList.remove('map__filters--disabled');
  fieldsetFiltersElements.forEach((fieldsetElement) => {
    fieldsetElement.disabled = false;
  });
  selectFiltersElements.forEach((selectElement) => {
    selectElement.disabled = false;
  });
}

const resetFiltersForm = () => {
  filtersFormElement.reset();
}

const getPriceType = (price) => {
  let type = '';

  if (!isNaN(price)) {
    if (price >= HousingPrices.MIDDLE_PRICES[1]) {
      type = 'high';
    } else if ((price >= HousingPrices.MIDDLE_PRICES[0]) && (price < HousingPrices.MIDDLE_PRICES[1])) {
      type = 'middle';
    } else {
      type = 'low';
    }
  }

  return type;
}

const getAccomodationRank = (accomodation) => {
  const priceType = getPriceType(accomodation.offer.price);
  const offer = accomodation.offer;
  const housingGuests = (housingGuestsElement.value && (housingGuestsElement.value !== DefaultFilters.HOUSING_GUESTS)) ?
    Number(housingGuestsElement.value) : DefaultFilters.HOUSING_GUESTS;
  let rank = 0;

  if (offer.type === (housingTypeElement.value || DefaultFilters.HOUSING_TYPE)) {
    rank += FiltersRank.HOUSING_TYPE;
  }
  if (priceType === (housingPriceElement.value || DefaultFilters.HOUSING_PRICE)) {
    rank += FiltersRank.HOUSING_PRICE;
  }
  if (offer.rooms === (Number(housingRoomsElement.value) || DefaultFilters.HOUSING_ROOMS)) {
    rank += FiltersRank.HOUSING_ROOMS;
  }
  if (offer.guests === housingGuests) {
    rank += FiltersRank.HOUSING_GUESTS;
  }
  if (filterWifiElement.checked && (offer.features.indexOf(filterWifiElement.value) !== -1)) {
    rank += FiltersRank.FEATURES_WIFI;
  }
  if (filterDishwasherElement.checked && (offer.features.indexOf(filterDishwasherElement.value) !== -1)) {
    rank += FiltersRank.FEATURES_DISHWASHER;
  }
  if (filterParkingElement.checked && (offer.features.indexOf(filterParkingElement.value) !== -1)) {
    rank += FiltersRank.FEATURES_PARKING;
  }
  if (filterWasherElement.checked && (offer.features.indexOf(filterWasherElement.value) !== -1)) {
    rank += FiltersRank.FEATURES_WASHER;
  }
  if (filterElevatorElement.checked && (offer.features.indexOf(filterElevatorElement.value) !== -1)) {
    rank += FiltersRank.FEATURES_ELEVATOR;
  }
  if (filterConditionerElement.checked && (offer.features.indexOf(filterConditionerElement.value) !== -1)) {
    rank += FiltersRank.FEATURES_CONDITIONER;
  }

  return rank;
};

const setFiltersChange = (cb) => {
  filtersFormElement.addEventListener('change', cb);
  filtersFormElement.addEventListener('reset', cb);
};

const getCurrentRank = () => {
  let rank = 0;

  if (housingTypeElement.value && (housingTypeElement.value !== DefaultFilters.HOUSING_TYPE)) {
    rank += FiltersRank.HOUSING_TYPE;
  }
  if (housingPriceElement.value && (housingPriceElement.value !== DefaultFilters.HOUSING_PRICE)) {
    rank += FiltersRank.HOUSING_PRICE;
  }
  if (housingRoomsElement.value && (housingRoomsElement.value !== DefaultFilters.HOUSING_ROOMS)) {
    rank += FiltersRank.HOUSING_ROOMS;
  }
  if (housingGuestsElement.value && (housingGuestsElement.value !== DefaultFilters.HOUSING_GUESTS)) {
    rank += FiltersRank.HOUSING_GUESTS;
  }
  if (filterWifiElement.checked) {
    rank += FiltersRank.FEATURES_WIFI;
  }
  if (filterDishwasherElement.checked) {
    rank += FiltersRank.FEATURES_DISHWASHER;
  }
  if (filterParkingElement.checked) {
    rank += FiltersRank.FEATURES_PARKING;
  }
  if (filterWasherElement.checked) {
    rank += FiltersRank.FEATURES_WASHER;
  }
  if (filterElevatorElement.checked) {
    rank += FiltersRank.FEATURES_ELEVATOR;
  }
  if (filterConditionerElement.checked) {
    rank += FiltersRank.FEATURES_CONDITIONER;
  }

  return rank;
};

const filterAccomodations = (currentFilterRank) => {
  return (item) => {
    item.rank = getAccomodationRank(item);
    return item.rank === currentFilterRank;
  };
};

disableFiltersForm();

export {enableFiltersForm, resetFiltersForm, filterAccomodations, getCurrentRank, setFiltersChange};
