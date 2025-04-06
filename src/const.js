const ROUTE_POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const DateTypes = {
  MONTH: 'MMM D',
  TIME: 'HH:mm',
  DATE: 'DD/MM/YY HH:mm'
};

export {ROUTE_POINT_TYPES, FilterTypes, DateTypes};
