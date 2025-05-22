import AbstractView from '../framework/view/abstract-view.js';
import {SortingTypes} from '../const.js';

function createSortTemplate() {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${Object.values(SortingTypes).map((item) => createElementSortTemplate(item)).join('')}
          </form>`);
}

function createElementSortTemplate(sortingType) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${sortingType}">
      <input
        id="sort-${sortingType}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortingType}"
        data-sort-type="${sortingType}"
        ${sortingType === SortingTypes.DAY ? 'checked' : ''}
        ${sortingType === SortingTypes.EVENT || sortingType === SortingTypes.OFFER ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sortingType}">${sortingType === SortingTypes.OFFER ? 'Offers' : sortingType}</label>
    </div>`
  );
}


export default class SortView extends AbstractView {
  #handleSortingTypeChange;

  constructor(onSortingTypeChange) {
    super();
    this.#handleSortingTypeChange = onSortingTypeChange;
    this.element.addEventListener('click', this.#sortClickHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortClickHandler = (evt) => {
    this.#handleSortingTypeChange(evt);
  };
}
