import {RenderPosition, render} from '../framework/render.js';
import HeaderView from '../view/header-view.js';

export default class HeaderPresenter {
  #container = null;
  #eventModel = null;

  constructor(container, eventModel) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  init() {
    this.eventsList = [...this.#eventModel.events];
    this.cityDestinationsList = [...this.#eventModel.cityDestinations];
    render(new HeaderView({events: this.eventsList, cityDestinations: this.#getCityDestinations()}), this.#container, RenderPosition.AFTERBEGIN);
  }

  #getCityDestinations() {
    const cityDestinations = this.eventsList.map((event) => event.cityDestination);
    return this.cityDestinationsList.filter((cityDestination) => cityDestinations.includes(cityDestination.id));
  }
}
