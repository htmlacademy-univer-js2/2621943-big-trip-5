import {getRandomEvent} from '../mock/event.js';
import {createOffers} from '../mock/offer.js';

const NUMBER_OF_EVENTS = 5;

export default class EventModel {
  offers = createOffers();
  events = Array.from({length: NUMBER_OF_EVENTS}, getRandomEvent);

  getOffers() {
    return this.offers;
  }

  getEvents() {
    return this.events;
  }
}
