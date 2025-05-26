import AbstractView from '../framework/view/abstract-view.js';
import {filter} from '../utils.js';

function createFilterTemplate(currentFilter, filterType) {
  const {type, count} = currentFilter;
  return (
    `<div class="trip-filters__filter">
       <input id="filter-${type}"
             class="trip-filters__filter-input  visually-hidden"
             type="radio"
             name="trip-filter"
             value="${type}"
             ${type === filterType ? 'checked' : ''}
             ${count === 0 ? 'disabled' : ''}>
       <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
     </div>`
  );
}

function createFiltersTemplate(filters, filterType) {
  return (
    `<form class="trip-filters" action="#" method="get">
       ${filters.map((currentFilter) => createFilterTemplate(currentFilter, filterType)).join('')}
       <button class="visually-hidden" type="submit">Accept filter</button>
     </form>`
  );
}

export default class FilterView extends AbstractView {
  #events = null;
  #filterType = null;
  #handleFilterChange = null;

  constructor({events, filterType, filterChange}) {
    super();
    this.#events = events;
    this.#filterType = filterType;
    this.#handleFilterChange = filterChange;

    this.element.addEventListener('change', this.#chosenFilterHandler);
  }

  #chosenFilterHandler = (evt) => {
    this.#handleFilterChange(evt.target.value);
  };

  get template() {
    return createFiltersTemplate(this.#createFilters(), this.#filterType);
  }

  #createFilters() {
    return Object.entries(filter).map(
      ([filterType, filterEvents]) => ({
        type: filterType,
        count: filterEvents(this.#events).length,
      }),
    );
  }
}
