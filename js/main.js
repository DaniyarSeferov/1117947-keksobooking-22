import {
  createMap,
  addMainPin,
  addDeclarationPins,
  changeMainPinToDefault,
  showDataErrorMsg,
  removeDeclarationPins
} from './map.js';
import {resetForm, setAdFormReset, setAdFormSubmit, showErrorMsg, showSuccessMsg} from './form.js';
import {createFetch} from './create-fetch.js';
import {resetFiltersForm, setFiltersChange} from './filters.js';
import {debounce} from './utils.js';
import './thumbnail.js';
import {initThumbnails, setDefaultThumbnails} from './thumbnail.js';

const RERENDER_DELAY = 500;

const getDeclarations = (map, mainPinMarker) => {
  const declarationsUrl = 'https://22.javascript.pages.academy/keksobooking/data';

  createFetch(declarationsUrl, null, (declarations) => {
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
  changeMainPinToDefault();
  setDefaultThumbnails();
};

const initMap = () => {
  const map = createMap();
  const mainPinMarker = addMainPin(map);
  getDeclarations(map, mainPinMarker);
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
