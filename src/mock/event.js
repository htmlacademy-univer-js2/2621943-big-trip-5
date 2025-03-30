import {ROUTE_POINT_TYPES} from '../const.js';
import {getRandomElement} from '../utils.js';
import {getRandomCityDestinationID} from './city-destination.js';

const mockEvents = [
  {
    id: 1,
    price: 7600,
    dateFrom: new Date('2024-12-20'),
    dateTo: new Date('2024-12-23'),
    cityDestination: getRandomCityDestinationID(),
    isFavorite: true,
    offers: [
      1, 2
    ],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 2,
    price: 1500,
    dateFrom: new Date('2024-12-11'),
    dateTo: new Date('2024-12-13'),
    cityDestination: getRandomCityDestinationID(),
    isFavorite: false,
    offers: [
      1
    ],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 3,
    price: 900,
    dateFrom: new Date('2024-12-20'),
    dateTo: new Date('2024-12-25'),
    cityDestination: getRandomCityDestinationID(),
    isFavorite: true,
    offers: [
      2, 4
    ],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 4,
    price: 8200,
    dateFrom: new Date('2024-12-01'),
    dateTo: new Date('2024-12-18'),
    cityDestination: getRandomCityDestinationID(),
    isFavorite: false,
    offers: [
      2, 3
    ],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 5,
    price: 1300,
    dateFrom: new Date('2024-12-09'),
    dateTo: new Date('2024-12-19'),
    cityDestination: getRandomCityDestinationID(),
    isFavorite: true,
    offers: [
      1, 2, 3
    ],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 6,
    price: 6500,
    dateFrom: new Date('2024-10-03'),
    dateTo: new Date('2024-12-09'),
    cityDestination: getRandomCityDestinationID(),
    isFavorite: false,
    offers: [
      3
    ],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
];

function getRandomEvent() {
  return getRandomElement(mockEvents);
}

export {getRandomEvent};
