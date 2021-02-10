import {getRandomIntInclusive, getRandomFloatInclusive, getRandomArrayElement, getRandomArrayElements} from './utils.js';

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const OFFER_CHECKIN_CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
]

const OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const DECLARATIONS_COUNT = 10;
const DECLARATION_USER_NUMBER_FIRST = 1;
const DECLARATION_USER_NUMBER_LAST = 8;
const DECLARATION_PRICE_MIN = 20000;
const DECLARATION_PRICE_MAX = 50000;
const DECLARATION_ROOMS_MIN = 1;
const DECLARATION_ROOMS_MAX = 5;
const DECLARATION_GUESTS_MIN = 1;
const DECLARATION_GUESTS_MAX = 3;
const DECLARATION_LOCATION_X_MIN = 35.65000;
const DECLARATION_LOCATION_X_MAX = 35.70000;
const DECLARATION_LOCATION_Y_MIN = 139.70000;
const DECLARATION_LOCATION_Y_MAX = 139.80000;

const getDeclarationAuthor = () => {
  let userNumber = getRandomIntInclusive(DECLARATION_USER_NUMBER_FIRST, DECLARATION_USER_NUMBER_LAST);
  userNumber = String(userNumber).padStart(2, '0');

  return {
    avatar: `img/avatars/user${userNumber}.png`,
  };
};

const getDeclarationOffer = ({x, y}) => {
  return {
    title: 'Сдаётся жильё.',
    address: `${x}, ${y}`,
    price: getRandomIntInclusive(DECLARATION_PRICE_MIN, DECLARATION_PRICE_MAX),
    type: getRandomArrayElement(OFFER_TYPES),
    rooms: getRandomIntInclusive(DECLARATION_ROOMS_MIN, DECLARATION_ROOMS_MAX),
    guests: getRandomIntInclusive(DECLARATION_GUESTS_MIN, DECLARATION_GUESTS_MAX),
    checkin: getRandomArrayElement(OFFER_CHECKIN_CHECKOUT_TIME),
    checkout: getRandomArrayElement(OFFER_CHECKIN_CHECKOUT_TIME),
    features: getRandomArrayElements(OFFER_FEATURES),
    description: 'Сдается жильё недалеко от центра города.',
    photos: getRandomArrayElements(OFFER_PHOTOS),
  };
};

const getDeclarationLocation = () => ({
  x: getRandomFloatInclusive(DECLARATION_LOCATION_X_MIN, DECLARATION_LOCATION_X_MAX, 5),
  y: getRandomFloatInclusive(DECLARATION_LOCATION_Y_MIN, DECLARATION_LOCATION_Y_MAX, 5),
});

const createDeclaration = () => {
  const offerLocation = getDeclarationLocation();

  return {
    author: getDeclarationAuthor(),
    offer: getDeclarationOffer(offerLocation),
    location: offerLocation,
  };
};

const getAllDeclarations = () => {
  return new Array(DECLARATIONS_COUNT).fill(null).map(createDeclaration);
};

export {getAllDeclarations};
