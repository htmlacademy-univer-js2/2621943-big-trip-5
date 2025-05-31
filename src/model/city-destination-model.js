import Observable from '../framework/observable.js';

export default class CityDestinationModel extends Observable {
  #cityDestinations = [];

  constructor() {
    super();
  }

  init(cityDestinations) {
    this.#cityDestinations = cityDestinations;
  }

  get cityDestinations() {
    return this.#cityDestinations;
  }
}
