import Observable from '../framework/observable.js';

export default class OfferModel extends Observable {
  #offers = [];
  #eventApiService = null;

  constructor({eventApiService}) {
    super();
    this.#eventApiService = eventApiService;
  }

  init() {
    this.#eventApiService.offers.then((offers) => {
      this.#offers = offers;
    });
  }

  get offers() {
    return this.#offers;
  }
}
