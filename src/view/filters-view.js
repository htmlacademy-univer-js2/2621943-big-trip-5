import AbstractView from '../framework/view/abstract-view.js';
import {filter} from '../utils.js';

function createFilterTemplate(currentFilter, isChecked) {
  const {type, count} = currentFilter;
  return (
    `<div class="trip-filters__filter">
       <input id="filter-${type}"
             class="trip-filters__filter-input  visually-hidden"
             type="radio"
             name="trip-filter"
             value="${type}"
             ${isChecked ? 'checked' : ''}
             ${count === 0 ? 'disabled' : ''}>
       <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
     </div>`
  );
}

function createFiltersTemplate(filters) {
  return (
    `<form class="trip-filters" action="#" method="get">
       ${filters.map((currentFilter, index) => createFilterTemplate(currentFilter, index === 0)).join('')}
       <button class="visually-hidden" type="submit">Accept filter</button>
     </form>`
  );
}

export default class FilterView extends AbstractView {
  #events = null;

  constructor({events}) {
    super();
    this.#events = events;
  }

  get template() {
    return createFiltersTemplate(this.#createFilters());
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
