import FilterView from '../view/filters-view.js';
import {ActionTypes} from '../const.js';
import {remove, render} from '../framework/render.js';

export default class FilterPresenter {
  #eventModel = null;
  #filterModel = null;
  #filterComponent = null;
  #filterContainer = null;

  constructor(eventModel, filterModel, filterContainer) {
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;
    this.#filterContainer = filterContainer;
    this.#eventModel.addObserver(this.#handleEventChange);
  }

  init() {
    this.#renderFilters();
  }

  get events() {
    return this.#eventModel.events;
  }

  #renderFilters() {
    if (this.#filterComponent) {
      remove(this.#filterComponent);
    }
    this.#filterComponent = new FilterView({
      events: this.events,
      filterType: this.#filterModel.filter,
      filterChange: this.#handleFilterChange,
    });
    render(this.#filterComponent, this.#filterContainer);
  }

  #handleFilterChange = (chosenFilterType) => {
    this.#filterModel.setToCurrent(ActionTypes.MAJOR, chosenFilterType);
  };

  #handleEventChange = () => {
    this.#renderFilters();
  };
}
