import {enableFiltersForm} from './filters.js';
import {enableForm, setAddress} from './form.js';
import {getAllDeclarations} from './data.js';
import {createCard} from './popup.js';

const TOKIO_COORDINATES = {
  lat: 35.68950,
  lng: 139.69171,
};

// eslint-disable-next-line no-undef
const map = L.map('map-canvas')
  .on('load', () => {
    enableFiltersForm();
    enableForm();
    setAddress(TOKIO_COORDINATES);
  })
  .setView(TOKIO_COORDINATES, 13);

// eslint-disable-next-line no-undef
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

// eslint-disable-next-line no-undef
const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// eslint-disable-next-line no-undef
const mainPinMarker = L.marker(
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

const points = getAllDeclarations();

points.forEach((point) => {
  const lat = point.location.x;
  const lng = point.location.y;
  // eslint-disable-next-line no-undef
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  // eslint-disable-next-line no-undef
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createCard(point),
      {
        keepInView: true,
      },
    );
});
