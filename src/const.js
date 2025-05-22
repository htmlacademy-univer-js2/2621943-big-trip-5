const ROUTE_POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const DateTypes = {
  MONTH: 'D MMM',
  TIME: 'HH:mm',
  DATE: 'DD/MM/YY HH:mm'
};

const SortingTypes = {
  EVENT: 'event',
  PRICE: 'price',
  OFFER: 'offer',
  DAY: 'day',
  TIME: 'time'
};

export {ROUTE_POINT_TYPES, FilterTypes, DateTypes, SortingTypes};
