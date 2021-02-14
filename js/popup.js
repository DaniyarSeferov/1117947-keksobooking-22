import {getAllDeclarations} from './data.js';

const cardTemplate = document.querySelector('#card')
  .content.querySelector('.popup');
const mapCanvasElement = document.querySelector('#map-canvas');

const declarations = getAllDeclarations();
const declarationListFragment = document.createDocumentFragment();

const getTypeLabel = (type) => {
  const typeMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
  };

  return typeMap[type];
};

const getRoomsContent = (roomsNumber, guestsNumber) => {
  let room = roomsNumber === 1 ? 'комната' : 'комнаты';
  room = roomsNumber === 5 ? 'комнат' : room;
  let guest = guestsNumber === 1 ? 'гостя' : 'гостей';
  return `${roomsNumber} ${room} для ${guestsNumber} ${guest}`;
}

const setFeaturesContent = (featuresElement, features) => {
  const featuresListFragment = document.createDocumentFragment();
  features.forEach((feature) => {
    const featureElement = featuresElement.querySelector(`.popup__feature--${feature}`);
    if (featureElement) {
      featuresListFragment.appendChild(featureElement);
    }
  });
  featuresElement.innerHTML = '';
  featuresElement.appendChild(featuresListFragment);
}

const setPhotosContent = (photosElement, photos) => {
  const photosListFragment = document.createDocumentFragment();
  const photoElementTemplate = photosElement.querySelector('.popup__photo');

  photos.forEach((photo) => {
    const photoElement = photoElementTemplate.cloneNode();
    photoElement.src = photo;
    photosListFragment.appendChild(photoElement);
  });
  photosElement.innerHTML = '';
  photosElement.appendChild(photosListFragment);
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
          selectedElement[elementKey] = getTypeLabel(data[dataKey]);
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

declarations.forEach((declaration) => {
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

  declarationListFragment.appendChild(cardElement);
});

mapCanvasElement.appendChild(declarationListFragment.firstChild);