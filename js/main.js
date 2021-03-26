import {
  createMap,
  addMainPin,
  addDeclarationPins,
  changeMainPinToDefault,
  showDataErrorMsg,
  removeDeclarationPins, TOKIO_COORDINATES
} from './map.js';
import {
  enableForm,
  resetForm, setAddress,
  setAdFormReset,
  setAdFormSubmit,
  setPriceElementData,
  showErrorMsg,
  showSuccessMsg
} from './form.js';
import {createFetch} from './create-fetch.js';
import {enableFiltersForm, resetFiltersForm, setFiltersChange} from './filters.js';
import {debounce} from './utils.js';
import './thumbnail.js';
import {initThumbnails, setDefaultThumbnails} from './thumbnail.js';

const RERENDER_DELAY = 500;

const getDeclarations = (map, mainPinMarker) => {
  const declarationsUrl = 'https://22.javascript.pages.academy/keksobooking/data';

  createFetch(declarationsUrl, null, (declarations) => {
    enableFiltersForm();
    let pins = addDeclarationPins(declarations, map, mainPinMarker);
    setFiltersChange(debounce(() => {
      removeDeclarationPins(pins, map);
      pins = addDeclarationPins(declarations, map, mainPinMarker);
    }, RERENDER_DELAY));
  }, () => {
    showDataErrorMsg();
  });
}

const resetToDefault = () => {
  resetFiltersForm();
  setPriceElementData();
  changeMainPinToDefault();
  setDefaultThumbnails();
};

const initMap = () => {
  createMap((map) => {
    const mainPinMarker = addMainPin(map);
    getDeclarations(map, mainPinMarker);
    enableForm();
    setAddress(TOKIO_COORDINATES);
  });
}

const initMainForm = () => {
  setAdFormSubmit(() => {
    showSuccessMsg();
    resetForm();
    resetToDefault();
  }, () => {
    showErrorMsg();
  });

  setAdFormReset(resetToDefault);
}

initMap();
initMainForm();
initThumbnails();
