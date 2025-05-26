import Observable from '../framework/observable.js';

export default class CityDestinationModel extends Observable {
  #eventApiService = null;
  #cityDestinations = [];

  constructor({eventApiService}) {
    super();
    this.#eventApiService = eventApiService;
  }

  init() {
    this.#eventApiService.cityDestinations.then((cityDestinations) => {
      this.#cityDestinations = cityDestinations;
    });
  }

  get cityDestinations() {
    return this.#cityDestinations;
  }
}
