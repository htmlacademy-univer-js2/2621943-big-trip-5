import AbstractView from '../framework/view/abstract-view.js';

function createNewEventTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}


export default class NewEventBtnView extends AbstractView {
  #handleEventCreationClick = null;

  constructor({onNewEventClick}) {
    super();
    this.#handleEventCreationClick = onNewEventClick;

    this.element.addEventListener('click', this.#newEventClickHandler);
  }

  get template() {
    return createNewEventTemplate();
  }

  #newEventClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEventCreationClick();
  };

}
