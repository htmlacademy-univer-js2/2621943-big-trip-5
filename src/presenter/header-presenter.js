import {RenderPosition, render, remove} from '../framework/render.js';
import HeaderView from '../view/header-view.js';

import {sortByTypes} from '../utils.js';
import {SortingTypes} from '../const.js';

export default class HeaderPresenter {
  #container = null;
  #eventModel = null;
  #cityDestinationModel = null;
  #headerComponent = null;

  constructor(container, eventModel, cityDestinationModel) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#cityDestinationModel = cityDestinationModel;
    this.#eventModel.addObserver(this.#handleEventsChange);
  }

  get events() {
    return this.#eventModel.events;
  }

  get cityDestinations() {
    return this.#cityDestinationModel.cityDestinations;
  }

  init() {
    this.#renderHeaderList();
  }

  #handleEventsChange = () => {
    this.#renderHeaderList();
  };

  #renderHeaderList() {
    if (this.#headerComponent) {
      remove(this.#headerComponent);
    }
    if (this.events.length === 0) {
      return;
    }
    this.#headerComponent = new HeaderView({
      routePoints: sortByTypes[SortingTypes.DAY](this.events),
      cityDestinations: this.cityDestinations
    });
    render(this.#headerComponent, this.#container, RenderPosition.AFTERBEGIN);
  }
}
