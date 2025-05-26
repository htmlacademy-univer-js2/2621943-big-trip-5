import AbstractView from '../framework/view/abstract-view';

function createEmptyEventsListTemplate(caption) {
  return (
    `<p class="trip-events__msg">${caption}</p>`
  );
}

export default class EmptyEventsListView extends AbstractView {
  #caption = '';

  constructor({caption}) {
    super();
    this.#caption = caption;
  }

  get template() {
    return createEmptyEventsListTemplate(this.#caption);
  }
}
