import {getRandomEvent} from '../mock/event.js';
import {createOffers} from '../mock/offer.js';
import {getMockCityDestinations} from '../mock/city-destination.js';

const NUMBER_OF_EVENTS = 5;

export default class EventModel {
  #offers = createOffers();
  #events = Array.from({length: NUMBER_OF_EVENTS}, getRandomEvent);
  #destinations = getMockCityDestinations();

  get offers() {
    return this.#offers;
  }

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }
}
