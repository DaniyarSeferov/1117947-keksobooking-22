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

const resetFiltersForm = () => {
  filtersFormElement.reset();
}

disableFiltersForm();

export {enableFiltersForm, resetFiltersForm};
