import {RenderPosition, render} from '../framework/render.js';
import HeaderView from '../view/header-view.js';

import {sortByTypes} from '../utils.js';
import {SortingTypes} from '../const.js';

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
    render(new HeaderView({
      routePoints: sortByTypes[SortingTypes.DAY](this.eventsList),
      cityDestinations: this.cityDestinationsList
    }), this.#container, RenderPosition.AFTERBEGIN);
  }
}
