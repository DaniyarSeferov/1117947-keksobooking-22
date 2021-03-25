import {getAccomodationLabel} from './utils.js';

const cardTemplate = document.querySelector('#card')
  .content.querySelector('.popup');

const getRoomsContent = (roomsNumber, guestsNumber) => {
  let room = roomsNumber === 1 ? 'комната' :
    roomsNumber === 5 ? 'комнат' : 'комнаты';
  let guest = guestsNumber === 1 ? 'гостя' : 'гостей';
  return `${roomsNumber} ${room} для ${guestsNumber} ${guest}`;
}

const setFeaturesContent = (featuresElement, features) => {
  if (features && features.length) {
    const featuresListFragment = document.createDocumentFragment();
    features.forEach((feature) => {
      const featureElement = featuresElement.querySelector(`.popup__feature--${feature}`);
      if (featureElement) {
        featuresListFragment.appendChild(featureElement);
      }
    });
    featuresElement.innerHTML = '';
    featuresElement.appendChild(featuresListFragment);
  } else {
    featuresElement.innerHTML = '';
    featuresElement.style = 'display: none';
  }
}

const setPhotosContent = (photosElement, photos) => {
  if (photos && photos.length) {
    const photosListFragment = document.createDocumentFragment();
    const photoElementTemplate = photosElement.querySelector('.popup__photo');

    photos.forEach((photo) => {
      const photoElement = photoElementTemplate.cloneNode();
      photoElement.src = photo;
      photosListFragment.appendChild(photoElement);
    });
    photosElement.innerHTML = '';
    photosElement.appendChild(photosListFragment);
  } else {
    photosElement.innerHTML = '';
    photosElement.style = 'display: none';
  }
}

const changeElementContent = (element, selector, elementKey, data, dataKey) => {
  const selectedElement = element.querySelector(selector);

  if (selectedElement) {
    if (selectedElement[elementKey] && data && data[dataKey]) {
      switch (dataKey) {
        case 'price':
          selectedElement[elementKey] = `${data[dataKey]} ₽/ночь`;
          break;
        case 'checkin':
          selectedElement[elementKey] = `Заезд после ${data[dataKey]}, выезд до ${data.checkout}`;
          break;
        case 'type':
          selectedElement[elementKey] = getAccomodationLabel(data[dataKey]);
          break;
        case 'rooms':
          selectedElement[elementKey] = getRoomsContent(data.rooms, data.guests);
          break;
        case 'features':
          setFeaturesContent(selectedElement, data[dataKey]);
          break;
        case 'photos':
          setPhotosContent(selectedElement, data[dataKey]);
          break;
        default:
          selectedElement[elementKey] = data[dataKey];
      }
    }
    else {
      selectedElement.style = 'display: none';
    }
  }
};

const createCard = (declaration) => {
  const offer = declaration.offer || {};
  const author = declaration.author || {};
  const cardElement = cardTemplate.cloneNode(true);

  changeElementContent(cardElement, '.popup__title', 'textContent', offer, 'title');
  changeElementContent(cardElement, '.popup__text--address', 'textContent', offer, 'address');
  changeElementContent(cardElement, '.popup__text--price', 'textContent', offer, 'price');
  changeElementContent(cardElement, '.popup__text--time', 'textContent', offer, 'checkin');
  changeElementContent(cardElement, '.popup__description', 'textContent', offer, 'description');
  changeElementContent(cardElement, '.popup__avatar', 'src', author, 'avatar');
  changeElementContent(cardElement, '.popup__type', 'textContent', offer, 'type');
  changeElementContent(cardElement, '.popup__text--capacity', 'textContent', offer, 'rooms');
  changeElementContent(cardElement, '.popup__features', 'innerHTML', offer, 'features');
  changeElementContent(cardElement, '.popup__photos', 'innerHTML', offer, 'photos');
  return cardElement;
};

export {createCard};
