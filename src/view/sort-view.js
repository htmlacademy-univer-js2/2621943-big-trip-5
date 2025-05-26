import AbstractView from '../framework/view/abstract-view.js';
import {SortingTypes} from '../const.js';

function createSortTemplate(chosenType) {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${Object.values(SortingTypes).map((element) => createElementSortTemplate(element, chosenType)).join('')}
          </form>`);
}

function createElementSortTemplate(sortingType, chosenType) {
  return (
    `<div class="trip-sort__item  trip-sort__item--${sortingType}">
      <input
        id="sort-${sortingType}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${sortingType}"
        data-sort-type="${sortingType}"
        ${sortingType === chosenType ? 'checked' : ''}
        ${sortingType === SortingTypes.EVENT || sortingType === SortingTypes.OFFER ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${sortingType}">${sortingType === SortingTypes.OFFER ? 'Offers' : sortingType}</label>
    </div>`
  );
}


export default class SortView extends AbstractView {
  #handleSortingTypeChange = null;
  #chosenSortingType = null;

  constructor({onSortingTypeChange, currentSortingType}) {
    super();
    this.#handleSortingTypeChange = onSortingTypeChange;
    this.#chosenSortingType = currentSortingType;
    this.element.addEventListener('click', this.#sortClickHandler);
  }

  get template() {
    return createSortTemplate(this.#chosenSortingType);
  }

  #sortClickHandler = (evt) => {
    this.#handleSortingTypeChange(evt);
  };
}
