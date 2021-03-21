import {createMap, addMainPin, addDeclarationPins, changeMainPinToDefault, showDataErrorMsg} from './map.js';
import {resetForm, setAdFormReset, setAdFormSubmit, showErrorMsg, showSuccessMsg} from './form.js';
import {createFetch} from './create-fetch.js';
import {resetFiltersForm} from './filters.js';

const getDeclarations = (map) => {
  const declarationsUrl = 'https://22.javascript.pages.academy/keksobooking/data';

  createFetch(declarationsUrl, null, (declarations) => {
    addDeclarationPins(declarations, map);
  }, () => {
    showDataErrorMsg();
  });
}

const resetToDefault = () => {
  resetFiltersForm();
  changeMainPinToDefault();
};

const initMap = () => {
  const map = createMap();
  addMainPin(map);
  getDeclarations(map);
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
