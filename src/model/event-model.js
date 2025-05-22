import {getRandomEvent} from '../mock/event.js';
import {createOffers} from '../mock/offer.js';
import {getMockCityDestinations} from '../mock/city-destination.js';

const NUMBER_OF_EVENTS = 5;

export default class EventModel {
  #offers = createOffers();
  #events = [];
  #cityDestinations = getMockCityDestinations();

  constructor() {
    this.#generateEvents();
  }

  #generateEvents() {
    const usedEvents = new Set();

    while (this.#events.length < NUMBER_OF_EVENTS) {
      const newEvent = getRandomEvent();

      if (!usedEvents.has(newEvent.id)) {
        usedEvents.add(newEvent.id);
        this.#events.push(newEvent);
      }
    }
  }

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
