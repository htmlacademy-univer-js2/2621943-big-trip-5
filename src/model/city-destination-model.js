import Observable from '../framework/observable.js';
import { getMockCityDestinations } from '../mock/city-destination.js';

export default class CityDestinationModel extends Observable {
  #cityDestinations = getMockCityDestinations();

  get cityDestinations() {
    return this.#cityDestinations;
  }
}
