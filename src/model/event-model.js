import {getRandomEvent} from '../mock/event.js';
import {createOffers} from '../mock/offer.js';
import {getMockCityDestinations} from '../mock/city-destination.js';

const NUMBER_OF_EVENTS = 4;

export default class EventModel {
  #offers = createOffers();
  #events = Array.from({length: NUMBER_OF_EVENTS}, getRandomEvent);
  #cityDestinations = getMockCityDestinations();

  get offers() {
    return this.#offers;
  }

  get events() {
    return this.#events;
  }

  get cityDestinations() {
    return this.#cityDestinations;
  }
}
