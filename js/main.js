'use strict';

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

getRandomIntInclusive(2, 5);
getRandomFloatInclusive(1.1, 1.2, 5);
