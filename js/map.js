/* global L:readonly */
import {enableFiltersForm} from './filters.js';
import {enableForm, setAddress} from './form.js';
import {createCard} from './popup.js';
import {isEscKey} from './utils.js';

const TOKIO_COORDINATES = {
  lat: 35.68950,
  lng: 139.69171,
};

let mainPinMarker = null;
const dataErrorTemplate = document.querySelector('#data-error')
  .content.querySelector('.error');
const dataErrorElement = dataErrorTemplate.cloneNode(true);
const mainElement = document.querySelector('main');

const createMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      enableFiltersForm();
      enableForm();
      setAddress(TOKIO_COORDINATES);
    })
    .setView(TOKIO_COORDINATES, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);

  return map;
}

const addMainPin = (map) => {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  mainPinMarker = L.marker(
    TOKIO_COORDINATES,
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
}

const addDeclarationPins = (declarations, map) => {
  const markers = [];

  declarations.forEach((declaration) => {
    const lat = declaration.location.lat;
    const lng = declaration.location.lng;
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat,
        lng,
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

  const group = new L.featureGroup(markers);
  map.fitBounds(group.getBounds());
}

const changeMainPinToDefault = () => {
  const newLatLng = new L.latLng(TOKIO_COORDINATES);
  mainPinMarker.setLatLng(newLatLng);
  setAddress(TOKIO_COORDINATES);
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

const showDataErrorMsg = () => {
  mainElement.appendChild(dataErrorElement);

  window.addEventListener('keydown', handleWindowKeydown);
  document.addEventListener('click', handleDocumentClick);
}

export {createMap, addMainPin, addDeclarationPins, changeMainPinToDefault, showDataErrorMsg};
