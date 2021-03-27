/* global L:readonly */
import {filterAccomodations, getCurrentRank} from './filters.js';
import {setAddress} from './form.js';
import {createCard} from './popup.js';
import {isEscKey} from './utils.js';

const TokyoCoordinates = {
  lat: 35.68950,
  lng: 139.69171,
};

const MAXIMAL_PINS_COUNT = 10;

let mainPinMarker = null;
const dataErrorTemplate = document.querySelector('#data-error')
  .content.querySelector('.error');
const dataErrorElement = dataErrorTemplate.cloneNode(true);
const mainElement = document.querySelector('main');

const createMap = (onLoad) => {
  const map = L.map('map-canvas');
  map.on('load', () => {
    onLoad(map);
  }).setView(TokyoCoordinates, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);
}

const addMainPin = (map) => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  mainPinMarker = L.marker(
    TokyoCoordinates,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    coordinates.lat = coordinates.lat.toFixed(5);
    coordinates.lng = coordinates.lng.toFixed(5);
    setAddress(coordinates);
  });

  return mainPinMarker;
}

const addDeclarationPins = (declarations, map, mainPinMarker) => {
  const markers = [];
  const currentFilterRank = getCurrentRank();

  declarations
    .slice()
    .filter(filterAccomodations(currentFilterRank))
    .slice(0, MAXIMAL_PINS_COUNT)
    .forEach((declaration) => {
      const locationLatitude = declaration.location.lat;
      const locationLongitude = declaration.location.lng;
      const icon = L.icon({
        iconUrl: 'img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker(
        {
          lat: locationLatitude,
          lng: locationLongitude,
        },
        {
          icon,
        },
      );
      markers.push(marker);

      marker
        .addTo(map)
        .bindPopup(
          createCard(declaration),
          {
            keepInView: true,
          },
        );
    });

  if (markers.length) {
    const group = new L.featureGroup(markers);
    group.addLayer(mainPinMarker);
    map.fitBounds(group.getBounds());
  }

  return markers;
}

const changeMainPinToDefault = () => {
  const defaultCoordinates = new L.latLng(TokyoCoordinates);
  mainPinMarker.setLatLng(defaultCoordinates);
  setAddress(TokyoCoordinates);
}

const removeDataErrorElement = () => {
  dataErrorElement.remove();
  window.removeEventListener('keydown', handleWindowKeydown);
  document.removeEventListener('click', handleDocumentClick);
}

const handleWindowKeydown = (evt) => {
  const isEsc = isEscKey(evt);

  if (isEsc) {
    removeDataErrorElement();
  }
}

const handleDocumentClick = (evt) => {
  if (mainElement.contains(dataErrorElement)) {
    evt.preventDefault();
    removeDataErrorElement();
  }
}

const showDataErrorMessage = () => {
  mainElement.appendChild(dataErrorElement);

  window.addEventListener('keydown', handleWindowKeydown);
  document.addEventListener('click', handleDocumentClick);
}

const removeDeclarationPins = (pins, map) => {
  pins.forEach((marker) => {
    map.removeLayer(marker);
  });
}

export {createMap, addMainPin, addDeclarationPins, changeMainPinToDefault, showDataErrorMessage, removeDeclarationPins,
  TokyoCoordinates};
