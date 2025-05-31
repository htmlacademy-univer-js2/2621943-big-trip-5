import Observable from '../framework/observable.js';

export default class OfferModel extends Observable {
  #offers = [];

  constructor() {
    super();
  }

  init(offers) {
    this.#offers = offers;
  }

  get offers() {
    return this.#offers;
  }
}
