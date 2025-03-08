import {ROUTE_POINT_TYPES} from '../const.js';
import {getRandomNumber} from '../utils.js';

const mockOffers = [];
const MAX_OFFERS = 5;

function createOffer(id) {
  return ({
    id,
    title: 'Upgrade',
    price: getRandomNumber(200, 1500)
  });
}

function createOffers() {
  for (let i = 0; i < ROUTE_POINT_TYPES.length; i++) {
    const currentOffer = {};
    currentOffer.type = ROUTE_POINT_TYPES[i];

    const offers = [];
    for (let j = 1; j <= MAX_OFFERS; j++) {
      offers.push(createOffer(j));
    }
    currentOffer.offers = offers;
    mockOffers.push(currentOffer);
  }
  return mockOffers;
}

export {createOffers};
