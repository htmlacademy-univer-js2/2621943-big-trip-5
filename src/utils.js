import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {FilterTypes, SortingTypes} from './const.js';

const HOUR_MS = 3600000;
const DAY_MS = 86400000;

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function formatDate(date, type) {
  return date ? dayjs(date).format(type) : '';
}

function findDuration(startDate, endDate, containsMilliseconds = false) {
  const duration = dayjs(endDate).diff(startDate);
  if (containsMilliseconds) {
    return duration;
  }

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

function isCurrentKeyEscape(evt) {
  return evt.key === 'Escape';
}

const sortByTypes = {
  [SortingTypes.TIME]: (routePoints) => routePoints.sort((first, second) => findDuration(second.dateFrom, second.dateTo, true) - findDuration(first.dateFrom, first.dateTo, true)),
  [SortingTypes.DAY]: (routePoints) => routePoints.sort((first, second) => dayjs(first.dateFrom).diff(dayjs(second.dateFrom))),
  [SortingTypes.PRICE]: (routePoints) => routePoints.sort((first, second) => second.price - first.price)
};


const filter = {
  [FilterTypes.EVERYTHING]: (events) => events,
  [FilterTypes.FUTURE]: (events) => events.filter((event) => dayjs().isBefore(dayjs(event.dateFrom))),
  [FilterTypes.PRESENT]: (events) => events.filter((event) => dayjs().isSameOrAfter(dayjs(event.dateFrom)) && dayjs().isSameOrBefore(dayjs(event.dateTo))),
  [FilterTypes.PAST]: (events) => events.filter((event) => dayjs().isAfter(dayjs(event.dateTo)))
};

export {
  getRandomElement,
  getRandomNumber,
  formatDate,
  findDuration,
  isCurrentKeyEscape,
  sortByTypes,
  filter
};
