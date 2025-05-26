import Observable from '../framework/observable.js';
import {createOffers} from '../mock/offer.js';

export default class OfferModel extends Observable {
  #offers = createOffers();

  get offers() {
    return this.#offers;
  }
}
