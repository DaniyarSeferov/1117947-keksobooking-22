'use strict';

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

const validateRandomRange = (min, max) => {
  if (min < 0 || max < 0) {
    throw new Error('Parameters must be greater than or equal to zero.')
  }
  else if (min > max) {
    throw new Error('min value must be less than max.');
  }
}

/**
 * Generates a random integer number from min to max including both min and max as possible values.
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
 *
 * @param min
 * @param max
 * @returns {number}
 */
const getRandomIntInclusive = (min, max) => {
  validateRandomRange(min, max);

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generates a random float number from min to max including both min and max as possible values.
 * Source: http://www.jacklmoore.com/notes/rounding-in-javascript/
 *
 * @param min
 * @param max
 * @param decimals
 * @returns {number}
 */
const getRandomFloatInclusive = (min, max, decimals = 0) => {
  validateRandomRange(min, max);

  let rand = Math.random() * (max - min) + min;
  return Number(Math.floor(rand + 'e' + decimals) + 'e-' + decimals);
};

const getRandomArrayElement = (elemets) => {
  return elemets[getRandomIntInclusive(0, elemets.length - 1)];
};

const getRandomArrayElements = (elemets) => {
  const randNumber = getRandomIntInclusive(0, elemets.length - 1);
  return elemets.slice(randNumber);
};

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

// eslint-disable-next-line no-unused-vars
const declarations = new Array(DECLARATIONS_COUNT).fill(null).map(createDeclaration);
