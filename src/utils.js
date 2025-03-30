import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMM';
const HOUR_MS = 3600000;
const DAY_MS = 86400000;

function formatDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function findDuration(startDate, endDate) {
  const duration = dayjs(endDate).diff(startDate);
  let timeFormat = 'DD[D] HH[H] mm[M]';
  if (duration < DAY_MS) {
    timeFormat = 'HH[H] mm[M]';
  }
  if (duration < HOUR_MS) {
    timeFormat = 'mm[M]';
  }
  return dayjs(duration).format(timeFormat);
}

function getRandomNumber(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(items) {
  return items[getRandomNumber(0, items.length - 1)];
}


export {getRandomElement, getRandomNumber, formatDate, findDuration};
