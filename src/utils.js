import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMM';

function formatDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function findDuration(startDate, endDate) {
  return dayjs(endDate).diff(startDate, 'd');
}

function getRandomNumber(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(items) {
  return items[getRandomNumber(0, items.length - 1)];
}


export {getRandomElement, getRandomNumber, formatDate, findDuration};
