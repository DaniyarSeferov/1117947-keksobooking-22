import {createMap, addMainPin, addDeclarationPins, changeMainPinToDefault} from './map.js';
import {resetForm, setAdFormReset, setAdFormSubmit, showErrorMsg, showSuccessMsg} from './form.js';
import {createFetch} from './create-fetch.js';
import {showAlert} from './utils.js';
import {resetFiltersForm} from './filters.js';

const getDeclarations = (map) => {
  const declarationsUrl = 'https://22.javascript.pages.academy/keksobooking/data';

  createFetch(declarationsUrl, null, (declarations) => {
    addDeclarationPins(declarations, map);
  }, () => {
    showAlert('Не удалось получить данные с сервера. Попробуйте перезагрузить страницу.');
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
