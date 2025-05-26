const ROUTE_POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const FilterEventsCaptions = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.FUTURE]: 'There are no future events now',
  [FilterTypes.PAST]: 'There are no past events now',
  [FilterTypes.PRESENT]: 'There are no present events now'
};

const DateTypes = {
  MONTH: 'D MMM',
  TIME: 'HH:mm',
  DATE: 'd/m/y H:i'
};

const SortingTypes = {
  EVENT: 'event',
  PRICE: 'price',
  OFFER: 'offer',
  DAY: 'day',
  TIME: 'time'
};

const ActionTypes = {
  MAJOR: 'MAJOR',
  PATCH: 'PATCH'
};

const UserActionTypes = {
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
};

export {ROUTE_POINT_TYPES, FilterTypes, FilterEventsCaptions, DateTypes, SortingTypes, ActionTypes, UserActionTypes};
