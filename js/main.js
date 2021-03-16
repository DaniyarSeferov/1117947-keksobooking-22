import {renderDeclarations} from './popup.js';
import {resetForm, setAdFormReset, setAdFormSubmit, showSuccessMsg} from './form.js';
import {createFetch} from './create-fetch.js';
import {showAlert} from './utils.js';

const declarationsUrl = 'https://22.javascript.pages.academy/keksobooking/data';

createFetch(declarationsUrl, null, renderDeclarations, () => {
  showAlert('Не удалось получить данные с сервера. Попробуйте перезагрузить страницу.');
});

const resetToDefault = () => {
  resetForm();
  // TODO reset Filters
};

setAdFormSubmit(() => {
  showSuccessMsg();
  // resetToDefault();
}, () => {
  showAlert('Не удалось отправить форму. Попробуйте ещё раз.');
});

setAdFormReset(resetToDefault);
