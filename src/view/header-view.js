import AbstractView from '../framework/view/abstract-view';

function createHeaderTemplate({price, cityDestinations}) {
  return (
    `<section class="trip-main__trip-info  trip-info">
       <div class="trip-info__main">
         <h1 class="trip-info__title">${cityDestinations}</h1>
         <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
       </div>
       <p class="trip-info__cost">
         Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
       </p>
     </section>`
  );
}

export default class HeaderView extends AbstractView {
  #events = null;
  #cityDestinations = null;

  constructor({events, cityDestinations}) {
    super();
    this.#events = events;
    this.#cityDestinations = cityDestinations;
  }

  get template() {
    return createHeaderTemplate({price: this.#calculatePrice(), cityDestinations: this.#getCityDestinations()});
  }

  #calculatePrice() {
    return this.#events.reduce((total, event) => total + event.price, 0);
  }

  #getCityDestinations() {
    return this.#cityDestinations.map((item) => item.name).join(' &mdash; ');
  }
}
