import {ROUTE_POINT_TYPES} from '../const.js';
import {getRandomElement} from '../utils.js';
import {getRandomCityDestinationID} from './city-destination.js';

const mockEvents = [
  {
    id: 1,
    price: 7600,
    dateFrom: '2023-10-18T08:45:32.000Z',
    dateTo: '2023-10-24T14:20:10.000Z',
    cityDestination: getRandomCityDestinationID(),
    isFavorite: true,
    offers: [1, 2],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 2,
    price: 1500,
    dateFrom: '2023-09-12T06:10:00.000Z',
    dateTo: '2023-09-17T18:25:00.000Z',
    cityDestination: getRandomCityDestinationID(),
    isFavorite: false,
    offers: [1],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 3,
    price: 900,
    dateFrom: '2023-07-05T11:50:25.000Z',
    dateTo: '2023-07-10T19:00:00.000Z',
    cityDestination: getRandomCityDestinationID(),
    isFavorite: true,
    offers: [2, 4],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 4,
    price: 8200,
    dateFrom: '2023-06-01T00:30:00.000Z',
    dateTo: '2023-06-12T22:00:00.000Z',
    cityDestination: getRandomCityDestinationID(),
    isFavorite: false,
    offers: [2, 3],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 5,
    price: 1300,
    dateFrom: '2023-05-15T09:15:45.000Z',
    dateTo: '2023-05-20T16:40:00.000Z',
    cityDestination: getRandomCityDestinationID(),
    isFavorite: true,
    offers: [1, 2, 3],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 6,
    price: 6500,
    dateFrom: '2023-04-01T12:00:00.000Z',
    dateTo: '2023-04-08T21:30:00.000Z',
    cityDestination: getRandomCityDestinationID(),
    isFavorite: false,
    offers: [3],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 7,
    price: 2500,
    dateFrom: '2023-03-10T05:00:00.000Z',
    dateTo: '2023-03-19T17:00:00.000Z',
    cityDestination: getRandomCityDestinationID(),
    isFavorite: true,
    offers: [1, 4],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 8,
    price: 50,
    dateFrom: '2023-02-10T04:20:00.000Z',
    dateTo: '2023-02-14T23:45:00.000Z',
    cityDestination: getRandomCityDestinationID(),
    isFavorite: false,
    offers: [1, 2],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
  {
    id: 9,
    price: 9000,
    dateFrom: '2023-01-01T00:00:00.000Z',
    dateTo: '2023-12-31T23:59:59.000Z',
    cityDestination: getRandomCityDestinationID(),
    isFavorite: true,
    offers: [1, 2, 3, 4],
    type: getRandomElement(ROUTE_POINT_TYPES)
  },
];

function getRandomEvent() {
  return getRandomElement(mockEvents);
}

export {getRandomEvent};
